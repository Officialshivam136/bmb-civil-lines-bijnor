import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const userId = (session.user as any).id;

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { items: true }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">My Account</h1>
        <Link href="/api/auth/signout" className="text-sm font-medium text-red-500 hover:underline">
          Sign Out
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-surface border border-border p-6 rounded-2xl sticky top-24">
            <h2 className="text-lg font-bold text-foreground mb-4">Profile</h2>
            <div className="space-y-4 text-sm text-foreground/80">
              <div>
                <p className="font-medium text-foreground/60 mb-1">Name</p>
                <p className="font-bold text-foreground">{session.user.name}</p>
              </div>
              <div>
                <p className="font-medium text-foreground/60 mb-1">Phone</p>
                <p className="font-bold text-foreground">{(session.user as any).phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-surface border border-border p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-foreground mb-6">Order History</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-12 text-foreground/60">
                You haven't placed any orders yet.
                <div className="mt-4">
                  <Link href="/menu" className="text-primary font-bold hover:underline">Browse Menu</Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map(order => (
                  <div key={order.id} className="border border-border/50 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-4 border-b border-border/30 pb-4">
                      <div>
                        <p className="font-bold text-foreground">{order.orderNumber}</p>
                        <p className="text-sm text-foreground/60">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full mb-1 ${
                          order.status === 'PENDING' ? 'bg-orange-100 text-orange-700' :
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                        <p className="font-bold text-primary">₹{order.total}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-foreground/80">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.quantity}x {item.productName} ({item.variantName})</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/30 flex justify-end">
                      <Link href={`/track-order/${order.orderNumber.replace('#', '')}`} className="text-sm font-bold text-primary hover:underline">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
