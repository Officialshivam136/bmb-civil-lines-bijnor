import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Generate a guaranteed collision-free order number like #BMB-261024-4821
async function generateUniqueOrderNumber(): Promise<string> {
  const now = new Date();
  const dateStr = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  
  for (let attempt = 0; attempt < 10; attempt++) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const candidate = `#BMB-${dateStr}-${randomSuffix}`;
    const existing = await prisma.order.findUnique({
      where: { orderNumber: candidate },
      select: { id: true }
    });
    if (!existing) {
      return candidate;
    }
  }

  return `#BMB-${Date.now().toString().slice(-8)}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, deliveryMethod, address, paymentMethod, subtotal, discount, userId } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!customer?.name || !customer?.phone) {
      return NextResponse.json({ error: 'Customer name and phone number are required' }, { status: 400 });
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

    // Generate Guaranteed Unique Order Number
    const orderNumber = await generateUniqueOrderNumber();

    const deliveryFee = deliveryMethod === 'DELIVERY' ? 40 : 0;
    const discountVal = discount ? Number(discount) : 0;
    const total = Math.max(0, serverSubtotal - discountVal + deliveryFee);

    // Create Order Transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create Address record to preserve customer name and WhatsApp number
      let savedAddressId = null;
      const isDelivery = deliveryMethod === 'DELIVERY';

      const newAddress = await tx.address.create({
        data: {
          userId: userId || null,
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          house: isDelivery ? (address?.house || 'N/A') : 'Counter Takeaway',
          street: isDelivery ? (address?.street || 'Civil Lines') : 'BMB Civil Lines Shop',
          area: isDelivery ? (address?.area || 'Bijnor') : 'Civil Lines',
          landmark: address?.landmark || null,
          city: address?.city || 'Bijnor',
          state: address?.state || 'Uttar Pradesh',
          pincode: address?.pincode || '246701',
        }
      });
      savedAddressId = newAddress.id;

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

      // 3. Create Payment record
      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          method: paymentMethod || 'COD',
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

    return NextResponse.json({ success: true, orderId: order.id, orderNumber: order.orderNumber, total });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error?.message || 'Failed to create order' }, { status: 500 });
  }
}
