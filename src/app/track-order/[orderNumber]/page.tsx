import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CheckCircle2, Clock, MapPin, Truck, Store, Package } from 'lucide-react';
import Link from 'next/link';

export default async function TrackOrderResultPage(props: { params: Promise<{ orderNumber: string }> }) {
  const params = await props.params;
  const orderNumber = params.orderNumber.startsWith('BMB-') ? `#${params.orderNumber}` : params.orderNumber;
  const formattedOrderNumber = orderNumber.startsWith('#') ? orderNumber : `#${orderNumber}`;

  const order = await prisma.order.findUnique({
    where: { orderNumber: formattedOrderNumber },
    include: { items: true, address: true }
  });

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Order Not Found</h1>
        <p className="text-foreground/70 mb-8">We couldn't find an order with ID {formattedOrderNumber}.</p>
        <Link href="/track-order" className="text-primary hover:underline font-medium">Try again</Link>
      </div>
    );
  }

  const deliveryStatuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const pickupStatuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED']; // DELIVERED acts as PICKED_UP
  
  const timeline = order.orderType === 'DELIVERY' ? deliveryStatuses : pickupStatuses;
  const currentIndex = timeline.indexOf(order.status);
  
  // If cancelled
  if (order.status === 'CANCELLED') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Order Cancelled</h1>
        <p className="text-foreground/70 mb-8">This order has been cancelled.</p>
        <Link href="/track-order" className="text-primary hover:underline font-medium">Track another order</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-foreground mb-2">Order Status</h1>
        <p className="text-foreground/70">{order.orderNumber}</p>
      </div>

      <div className="bg-surface border border-border rounded-3xl p-8 mb-8 relative">
        <div className="absolute top-0 bottom-0 left-[39px] w-0.5 bg-border/50"></div>
        
        <div className="space-y-8 relative">
          {timeline.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            const titles: Record<string, string> = {
              'PENDING': 'Order Placed',
              'CONFIRMED': 'Order Confirmed',
              'PREPARING': 'Preparing',
              'READY': order.orderType === 'DELIVERY' ? 'Ready for Dispatch' : 'Ready for Pickup',
              'OUT_FOR_DELIVERY': 'Out for Delivery',
              'DELIVERED': order.orderType === 'DELIVERY' ? 'Delivered' : 'Picked Up'
            };

            const descriptions: Record<string, string> = {
              'PENDING': 'We have received your order.',
              'CONFIRMED': 'The shop has accepted your order.',
              'PREPARING': 'Your mithai is being packed freshly.',
              'READY': 'Your order is packed and ready.',
              'OUT_FOR_DELIVERY': 'Your order is on the way.',
              'DELIVERED': 'Enjoy your delicious mithai!'
            };

            const Icons: Record<string, any> = {
              'PENDING': Clock,
              'CONFIRMED': CheckCircle2,
              'PREPARING': Package,
              'READY': Store,
              'OUT_FOR_DELIVERY': Truck,
              'DELIVERED': CheckCircle2
            };

            const Icon = Icons[step];

            return (
              <div key={step} className={`flex gap-6 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 shrink-0 ${isCompleted ? 'bg-primary text-white' : 'bg-surface border-2 border-border text-foreground'}`}>
                  <Icon className="w-5 h-5" />
                  {isCurrent && (
                    <div className="absolute -inset-2 rounded-full border-2 border-primary animate-ping opacity-20"></div>
                  )}
                </div>
                <div className="pt-2 pb-4">
                  <h3 className={`font-bold ${isCurrent ? 'text-primary' : 'text-foreground'}`}>{titles[step]}</h3>
                  <p className="text-sm text-foreground/70">{descriptions[step]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="text-center">
        <Link href={`/order-confirmation/${order.id}`} className="text-primary hover:underline font-medium">View Order Details</Link>
      </div>
    </div>
  );
}
