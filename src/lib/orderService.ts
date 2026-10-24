import { prisma } from '@/lib/prisma';

export interface OrderItemData {
  id: string;
  productName: string;
  variantName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface LiveOrder {
  id: string;
  tokenNumber: number;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  orderType: 'PICKUP' | 'DINE_IN' | 'DELIVERY';
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: 'UPI' | 'CASH' | 'CARD';
  paymentStatus: 'VERIFIED' | 'VERIFY_REQUIRED' | 'PAID';
  isVip: boolean;
  total: number;
  itemCount: number;
  itemsSummary: string;
  timeAgo: string;
  createdAt: Date;
}

export interface TvDisplayOrder {
  id: string;
  tokenNumber: number;
  orderNumber: string;
  customerName: string;
  orderType: 'PICKUP' | 'DINE_IN' | 'DELIVERY';
  status: 'PENDING' | 'PREPARING' | 'READY';
  updatedAt: Date;
}

// Initial mock orders matching the shop layout
const INITIAL_ORDERS: LiveOrder[] = [
  {
    id: 'ord_bmb_1005',
    tokenNumber: 5,
    orderNumber: '#BMB-001005',
    customerName: 'Ajendra Singh',
    customerPhone: '+91 89791 64646',
    orderType: 'PICKUP',
    status: 'PENDING',
    paymentMethod: 'UPI',
    paymentStatus: 'VERIFY_REQUIRED',
    isVip: true,
    total: 20,
    itemCount: 1,
    itemsSummary: 'Desi Samosa (1 pc)',
    timeAgo: '5:43 pm',
    createdAt: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: 'ord_bmb_1002',
    tokenNumber: 2,
    orderNumber: '#BMB-001002',
    customerName: 'Ajendra Singh',
    customerPhone: '+91 89791 64646',
    orderType: 'PICKUP',
    status: 'PENDING',
    paymentMethod: 'UPI',
    paymentStatus: 'VERIFY_REQUIRED',
    isVip: true,
    total: 22,
    itemCount: 1,
    itemsSummary: 'Desi Samosa (1 pc)',
    timeAgo: '5:35 pm',
    createdAt: new Date(Date.now() - 18 * 60 * 1000)
  },
  {
    id: 'ord_bmb_1003',
    tokenNumber: 3,
    orderNumber: '#BMB-001003',
    customerName: 'Ajendra Singh',
    customerPhone: '+91 89791 64646',
    orderType: 'PICKUP',
    status: 'PREPARING',
    paymentMethod: 'CASH',
    paymentStatus: 'PAID',
    isVip: true,
    total: 20,
    itemCount: 1,
    itemsSummary: 'Desi Ghee Jalebi (100g)',
    timeAgo: '5:22 pm',
    createdAt: new Date(Date.now() - 32 * 60 * 1000)
  },
  {
    id: 'ord_bmb_1001',
    tokenNumber: 1,
    orderNumber: '#BMB-001001',
    customerName: 'Shivam Sharma',
    customerPhone: '9876543210',
    orderType: 'DELIVERY',
    status: 'DELIVERED',
    paymentMethod: 'UPI',
    paymentStatus: 'VERIFIED',
    isVip: true,
    total: 140,
    itemCount: 1,
    itemsSummary: 'Bikaneri Peda (250g)',
    timeAgo: '4:15 pm',
    createdAt: new Date(Date.now() - 120 * 60 * 1000)
  }
];

// Global in-memory storage for real-time updates & serverless sync
let globalLiveOrders: LiveOrder[] = [...INITIAL_ORDERS];
let globalIsTakingOrders: boolean = true;
let nextTokenCounter = 6;

// Helper to extract or generate short token number
function extractTokenNumber(orderNumber: string, index: number): number {
  const match = orderNumber.match(/\d+$/);
  if (match) {
    const num = parseInt(match[0], 10);
    return num > 1000 ? num % 100 : num;
  }
  return (index % 50) + 1;
}

export async function getLiveOrders(): Promise<LiveOrder[]> {
  try {
    const dbOrders = await prisma.order.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: {
        items: true,
        address: true
      }
    });

    if (dbOrders && dbOrders.length > 0) {
      // Map database orders
      const mappedDbOrders: LiveOrder[] = dbOrders.map((o: any, idx: number) => {
        const tokenNum = extractTokenNumber(o.orderNumber, idx);
        const itemNames = o.items?.map((it: any) => `${it.productName} (${it.quantity})`).join(', ') || 'Fresh Sweets';
        const dateObj = new Date(o.createdAt);
        const timeStr = dateObj.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
        
        return {
          id: o.id,
          tokenNumber: tokenNum,
          orderNumber: o.orderNumber,
          customerName: o.address?.name || 'Valued Patron',
          customerPhone: o.address?.phone || undefined,
          orderType: (o.orderType as any) || 'PICKUP',
          status: o.status as any,
          paymentMethod: 'UPI',
          paymentStatus: o.status === 'PENDING' ? 'VERIFY_REQUIRED' : 'VERIFIED',
          isVip: true,
          total: o.total,
          itemCount: o.items?.length || 1,
          itemsSummary: itemNames,
          timeAgo: timeStr,
          createdAt: dateObj
        };
      });

      // Merge with in-memory created orders that might not be in DB yet
      const dbIds = new Set(mappedDbOrders.map(o => o.id));
      const newlyAdded = globalLiveOrders.filter(o => !dbIds.has(o.id));
      return [...newlyAdded, ...mappedDbOrders];
    }
  } catch (err) {
    console.warn('[orderService] Database lookup fallback:', err);
  }

  return globalLiveOrders;
}

export async function getTvOrders(): Promise<{
  received: TvDisplayOrder[];
  preparing: TvDisplayOrder[];
  ready: TvDisplayOrder[];
}> {
  const allOrders = await getLiveOrders();

  const received: TvDisplayOrder[] = allOrders
    .filter(o => o.status === 'PENDING' || o.status === 'CONFIRMED')
    .map(o => ({
      id: o.id,
      tokenNumber: o.tokenNumber,
      orderNumber: o.orderNumber,
      customerName: o.customerName.split(' ')[0], // First name for TV display
      orderType: o.orderType,
      status: 'PENDING',
      updatedAt: o.createdAt
    }));

  const preparing: TvDisplayOrder[] = allOrders
    .filter(o => o.status === 'PREPARING')
    .map(o => ({
      id: o.id,
      tokenNumber: o.tokenNumber,
      orderNumber: o.orderNumber,
      customerName: o.customerName.split(' ')[0],
      orderType: o.orderType,
      status: 'PREPARING',
      updatedAt: o.createdAt
    }));

  const ready: TvDisplayOrder[] = allOrders
    .filter(o => o.status === 'READY')
    .map(o => ({
      id: o.id,
      tokenNumber: o.tokenNumber,
      orderNumber: o.orderNumber,
      customerName: o.customerName.split(' ')[0],
      orderType: o.orderType,
      status: 'READY',
      updatedAt: o.createdAt
    }));

  return { received, preparing, ready };
}

export async function updateOrderStatus(orderId: string, newStatus: LiveOrder['status']) {
  // Update in-memory storage immediately for zero-lag TV sync
  globalLiveOrders = globalLiveOrders.map(o => {
    if (o.id === orderId || o.orderNumber === orderId) {
      return { ...o, status: newStatus };
    }
    return o;
  });

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus }
    });
  } catch (err) {
    console.warn('[orderService] DB status update fallback:', err);
  }

  return { success: true, orderId, status: newStatus };
}

export function registerWebOrder(data: {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  orderType: 'PICKUP' | 'DINE_IN' | 'DELIVERY';
  total: number;
  itemsSummary: string;
  itemCount: number;
  paymentMethod: string;
}) {
  const token = nextTokenCounter++;
  const dateObj = new Date();
  const timeStr = dateObj.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();

  const newOrder: LiveOrder = {
    id: data.id,
    tokenNumber: token,
    orderNumber: data.orderNumber,
    customerName: data.customerName || 'Online Patron',
    customerPhone: data.customerPhone,
    orderType: data.orderType || 'DELIVERY',
    status: 'PENDING',
    paymentMethod: (data.paymentMethod as any) || 'UPI',
    paymentStatus: data.paymentMethod === 'COD' ? 'PAID' : 'VERIFY_REQUIRED',
    isVip: false,
    total: data.total,
    itemCount: data.itemCount,
    itemsSummary: data.itemsSummary,
    timeAgo: timeStr,
    createdAt: dateObj
  };

  globalLiveOrders.unshift(newOrder);
  return newOrder;
}

export function createPosOrder(data: {
  customerName: string;
  customerPhone?: string;
  orderType: 'PICKUP' | 'DINE_IN' | 'DELIVERY';
  paymentMethod: 'CASH' | 'UPI' | 'CARD';
  items: { name: string; variant: string; price: number; qty: number }[];
  discount?: number;
}) {
  const token = nextTokenCounter++;
  const orderNum = `#BMB-00100${token}`;
  const subtotal = data.items.reduce((s, it) => s + it.price * it.qty, 0);
  const total = Math.max(0, subtotal - (data.discount || 0));

  const newOrder: LiveOrder = {
    id: `pos_${Date.now()}`,
    tokenNumber: token,
    orderNumber: orderNum,
    customerName: data.customerName || 'Counter Guest',
    customerPhone: data.customerPhone,
    orderType: data.orderType || 'PICKUP',
    status: 'PENDING',
    paymentMethod: data.paymentMethod || 'CASH',
    paymentStatus: data.paymentMethod === 'CASH' ? 'PAID' : 'VERIFIED',
    isVip: false,
    total,
    itemCount: data.items.reduce((s, it) => s + it.qty, 0),
    itemsSummary: data.items.map(it => `${it.name} (${it.qty})`).join(', '),
    timeAgo: new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase(),
    createdAt: new Date()
  };

  globalLiveOrders.unshift(newOrder);
  return newOrder;
}

export async function getOrderMetrics() {
  const orders = await getLiveOrders();
  const nonCancelled = orders.filter(o => o.status !== 'CANCELLED');
  const todayRevenue = nonCancelled.reduce((acc, o) => acc + (o.total || 0), 0);
  const ordersToday = orders.length;
  const waitingApproval = orders.filter(o => o.status === 'PENDING').length;
  const avgOrderValue = ordersToday > 0 ? Math.round(todayRevenue / ordersToday) : 44;

  return {
    todayRevenue: todayRevenue || 222,
    discountsGiven: 4,
    ordersToday: ordersToday || 5,
    cancelledToday: 0,
    waitingApproval,
    avgOrderValue,
    totalCustomers: 2,
    vipCustomers: 2
  };
}

export function getShopStatus() {
  return globalIsTakingOrders;
}

export function setShopStatus(status: boolean) {
  globalIsTakingOrders = status;
  return globalIsTakingOrders;
}
