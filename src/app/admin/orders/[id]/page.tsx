import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import OrderStatusClient from '@/components/admin/OrderStatusClient';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function AdminOrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true, address: true, payment: true }
  });

  if (!order) {
    notFound();
  }

  // Calculate if customer has ordered >= 2 times in the last 30 days
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  let customerMonthlyOrders = 1;
  if (order.address?.phone) {
    customerMonthlyOrders = await prisma.order.count({
      where: {
        address: { phone: order.address.phone },
        createdAt: { gte: thirtyDaysAgo },
        status: { not: 'CANCELLED' }
      }
    });
  }
  const isVipCustomer = customerMonthlyOrders >= 2;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link href="/admin/orders" className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Order {order.orderNumber}</h2>
        <OrderStatusClient orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-lg border-b border-border pb-2">Customer & Delivery</h3>
          {order.address ? (
            <div className="text-sm space-y-2">
              <p><span className="font-medium text-foreground/60">Name:</span> {order.address.name}</p>
              <p><span className="font-medium text-foreground/60">Phone:</span> {order.address.phone}</p>
              <p><span className="font-medium text-foreground/60">Type:</span> Home Delivery</p>
              <p><span className="font-medium text-foreground/60">Address:</span> {order.address.house}, {order.address.street}, {order.address.area}, {order.address.city}</p>
              {order.notes && (
                <p><span className="font-medium text-foreground/60">Note:</span> <span className="font-bold text-primary">{order.notes}</span></p>
              )}
            </div>
          ) : (
            <div className="text-sm space-y-2">
              <p><span className="font-medium text-foreground/60">Type:</span> Store Counter Pickup</p>
              {order.notes && (
                <p><span className="font-medium text-foreground/60">Handover Note:</span> <span className="font-bold text-primary">{order.notes}</span></p>
              )}
            </div>
          )}
          <div className="pt-2 border-t border-border/60 text-xs">
            <span className="font-medium text-foreground/60 mr-1.5">Patron Classification:</span>
            {isVipCustomer ? (
              <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                👑 VIP Patron ({customerMonthlyOrders} orders this month)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-medium text-neutral-600 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                Normal User ({customerMonthlyOrders}/2 orders this month)
              </span>
            )}
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-lg border-b border-border pb-2">Payment Details</h3>
          {order.payment && (
            <div className="text-sm space-y-2">
              <p><span className="font-medium text-foreground/60">Method:</span> {order.payment.method}</p>
              <p><span className="font-medium text-foreground/60">Status:</span> {order.payment.status}</p>
              <p><span className="font-medium text-foreground/60">Amount:</span> ₹{order.payment.amount}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-surface border border-border p-6 rounded-2xl">
        <h3 className="font-bold text-lg border-b border-border pb-2 mb-4">Order Items</h3>
        <div className="space-y-4">
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
              <div>
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-foreground/60">{item.variantName} x {item.quantity}</p>
              </div>
              <div className="font-bold text-primary">₹{item.total}</div>
            </div>
          ))}
          
          <div className="flex justify-between items-center pt-4 text-sm text-foreground/60">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-foreground/60">
            <span>Delivery Fee</span>
            <span>₹{order.deliveryFee}</span>
          </div>
          <div className="flex justify-between items-center pt-4 font-bold text-lg border-t border-border mt-4">
            <span>Total</span>
            <span className="text-primary">₹{order.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
