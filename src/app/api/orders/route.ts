import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, deliveryMethod, address, paymentMethod, subtotal, discount, userId } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Verify prices on server
    let serverSubtotal = 0;
    const orderItemsData: any[] = [];
    
    for (const item of items) {
      const variant = await prisma.productVariant.findUnique({
        where: { id: item.variantId },
        include: { product: true }
      });
      
      if (!variant) {
        return NextResponse.json({ error: `Variant not found: ${item.name}` }, { status: 400 });
      }
      
      if (variant.stock < item.quantity) {
        return NextResponse.json({ error: `Not enough stock for ${item.name}` }, { status: 400 });
      }

      serverSubtotal += variant.price * item.quantity;
      
      orderItemsData.push({
        variantId: variant.id,
        productName: variant.product.name,
        variantName: variant.weight,
        price: variant.price,
        quantity: item.quantity,
        total: variant.price * item.quantity
      });
    }

    // Generate Order Number
    const count = await prisma.order.count();
    const orderNumber = `#BMB-${String(count + 1000).padStart(6, '0')}`;

    const deliveryFee = deliveryMethod === 'DELIVERY' ? 40 : 0;
    const discountVal = discount ? Number(discount) : 0;
    const total = Math.max(0, serverSubtotal - discountVal + deliveryFee);

    // Create Order Transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create Address if delivery
      let savedAddressId = null;
      if (deliveryMethod === 'DELIVERY') {
        const newAddress = await tx.address.create({
          data: {
            userId: userId || null,
            name: customer.name,
            phone: customer.phone,
            house: address.house,
            street: address.street,
            area: address.area,
            landmark: address.landmark || null,
            city: address.city || 'Bijnor',
            state: address.state || 'Uttar Pradesh',
            pincode: address.pincode || '246701',
          }
        });
        savedAddressId = newAddress.id;
      }

      // 2. Create Order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: userId || null,
          orderType: deliveryMethod,
          notes: body.notes || (deliveryMethod === 'PICKUP' ? 'Counter Pickup (Civil Lines)' : 'Doorstep Delivery'),
          subtotal: serverSubtotal,
          discount: discountVal,
          deliveryFee,
          total,
          addressId: savedAddressId,
          items: {
            create: orderItemsData
          }
        }
      });

      // 3. Create Payment
      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          method: paymentMethod,
          amount: total,
          status: 'PENDING'
        }
      });

      // 4. Update Inventory
      for (const item of items) {
        await tx.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      return newOrder;
    });

    return NextResponse.json({ success: true, orderId: order.id, orderNumber: order.orderNumber });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
