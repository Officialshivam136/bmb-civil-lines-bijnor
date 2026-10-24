import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CheckCircle2, Clock, MapPin } from 'lucide-react';

export default async function OrderConfirmationPage(props: { params: Promise<{ orderId: string }> }) {
  const params = await props.params;
  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: {
      items: true,
      address: true,
      payment: true
    }
  });

  if (!order) {
    notFound();
  }

  // Determine WhatsApp Message
  const shopPhone = "+918979164646";
  const itemsText = order.items.map(item => `${item.productName} (${item.variantName}) x ${item.quantity}`).join('%0A');
  const addressText = order.address ? `${order.address.name}, ${order.address.house}, ${order.address.street}, ${order.address.area}` : 'Pickup';
  const whatsappMsg = `Hello Bikaner Misthan Bhandar,%0A%0AI have placed an order.%0AOrder ID: ${order.orderNumber}%0A%0AItems:%0A${itemsText}%0A%0ATotal: ₹${order.total}%0A%0A${order.orderType}:%0A${addressText}`;

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed Successfully!</h1>
      <p className="text-lg text-foreground/70 mb-8">Thank you for your order. We are processing it.</p>
      
      <div className="bg-surface border border-border rounded-2xl p-6 text-left mb-8 shadow-sm">
        <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
          <div>
            <p className="text-sm text-foreground/60">Order ID</p>
            <p className="font-bold text-foreground text-lg">{order.orderNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-foreground/60">Total Amount</p>
            <p className="font-bold text-primary text-xl">₹{order.total}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-foreground">Items Ordered</h3>
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between text-sm border-b border-border/30 pb-2">
              <span className="text-foreground/80">{item.quantity}x {item.productName} ({item.variantName})</span>
              <span className="font-medium">₹{item.total}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-foreground/60 mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Status</h3>
            <p className="font-medium">{order.status}</p>
          </div>
          <div>
            <h3 className="text-sm text-foreground/60 mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> {order.orderType === 'DELIVERY' ? 'Delivery To' : 'Pickup'}</h3>
            <p className="font-medium text-sm line-clamp-2">
              {order.address ? `${order.address.house}, ${order.address.street}` : 'Bikaner Misthan Bhandar'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/track-order?id=${order.orderNumber}`} className="bg-surface border border-primary text-primary font-bold py-3 px-8 rounded-xl hover:bg-primary/5 transition-colors">
          TRACK ORDER
        </Link>
        <a href={`https://wa.me/${shopPhone}?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#128C7E] transition-colors">
          ORDER ON WHATSAPP
        </a>
      </div>
      <div className="mt-8">
        <Link href="/" className="text-primary hover:underline font-medium">Continue Shopping</Link>
      </div>
    </div>
  );
}
