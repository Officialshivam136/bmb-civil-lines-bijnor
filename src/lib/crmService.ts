import { prisma } from '@/lib/prisma';

export interface CustomerProfile {
  id: string;
  phone: string;
  name: string;
  email?: string | null;
  area: string;
  city: string;
  totalOrders: number;
  monthlyOrders: number;
  isVip: boolean;
  totalSpend: number;
  avgOrderValue: number;
  lastOrderDate: Date;
  daysSinceLastOrder: number;
  status: 'VIP' | 'ACTIVE' | 'OCCASIONAL' | 'LAPSED' | 'NEW';
  favoriteItems: { name: string; count: number }[];
  orderHistory: {
    id: string;
    orderNumber: string;
    date: Date;
    total: number;
    status: string;
    orderType: string;
    notes?: string | null;
    itemsCount: number;
    itemNames: string[];
  }[];
}

export interface CrmStats {
  totalCustomers: number;
  vipCustomers: number;
  activeCustomers: number;
  lapsedCustomers: number;
  totalRevenue: number;
  repeatCustomerRate: number;
  averageLtv: number;
}

export async function getCrmData(): Promise<{
  customers: CustomerProfile[];
  stats: CrmStats;
}> {
  // Fetch all orders with items, addresses and users
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      address: true,
      user: true,
      items: true
    }
  });

  // Fetch all registered users
  const users = await prisma.user.findMany({
    include: {
      addresses: true
    }
  });

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Map to group by normalized 10-digit phone number
  const customerMap = new Map<string, {
    names: string[];
    emails: string[];
    areas: string[];
    cities: string[];
    orders: typeof orders;
    registeredUserId?: string;
  }>();

  // Helper to normalize phone
  const normalizePhone = (phoneStr: string | null | undefined): string => {
    if (!phoneStr) return '';
    const digits = phoneStr.replace(/\D/g, '');
    return digits.length >= 10 ? digits.slice(-10) : digits;
  };

  // 1. Ingest from Orders
  for (const order of orders) {
    const rawPhone = order.address?.phone || order.user?.phone || '';
    const phone = normalizePhone(rawPhone);
    if (!phone) continue;

    if (!customerMap.has(phone)) {
      customerMap.set(phone, {
        names: [],
        emails: [],
        areas: [],
        cities: [],
        orders: [],
        registeredUserId: order.userId || undefined
      });
    }

    const entry = customerMap.get(phone)!;
    entry.orders.push(order);

    const name = order.address?.name || order.user?.name;
    if (name && !entry.names.includes(name)) entry.names.push(name);

    const email = order.user?.email;
    if (email && !entry.emails.includes(email)) entry.emails.push(email);

    const area = order.address?.area;
    if (area && !entry.areas.includes(area)) entry.areas.push(area);

    const city = order.address?.city;
    if (city && !entry.cities.includes(city)) entry.cities.push(city);
  }

  // 2. Ingest registered users without orders yet
  for (const u of users) {
    const phone = normalizePhone(u.phone);
    if (!phone) continue;

    if (!customerMap.has(phone)) {
      customerMap.set(phone, {
        names: u.name ? [u.name] : [],
        emails: u.email ? [u.email] : [],
        areas: u.addresses[0]?.area ? [u.addresses[0].area] : [],
        cities: u.addresses[0]?.city ? [u.addresses[0].city] : [],
        orders: [],
        registeredUserId: u.id
      });
    } else {
      const entry = customerMap.get(phone)!;
      if (u.name && !entry.names.includes(u.name)) entry.names.push(u.name);
      if (u.email && !entry.emails.includes(u.email)) entry.emails.push(u.email);
    }
  }

  // 3. Transform into CustomerProfile objects
  const customerProfiles: CustomerProfile[] = [];

  for (const [phone, data] of customerMap.entries()) {
    const totalOrders = data.orders.length;
    
    // Calculate monthly orders (past 30 days)
    const monthlyOrders = data.orders.filter(
      (o) => new Date(o.createdAt) >= thirtyDaysAgo && o.status !== 'CANCELLED'
    ).length;

    const isVip = monthlyOrders >= 2;

    const totalSpend = data.orders
      .filter((o) => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + o.total, 0);

    const avgOrderValue = totalOrders > 0 ? Math.round(totalSpend / totalOrders) : 0;

    const latestOrder = data.orders[0]; // Already ordered by createdAt desc
    const lastOrderDate = latestOrder ? new Date(latestOrder.createdAt) : new Date(0);
    const daysSinceLastOrder = latestOrder
      ? Math.floor((now.getTime() - lastOrderDate.getTime()) / (1000 * 60 * 60 * 24))
      : 999;

    // Segment Status Logic
    let status: CustomerProfile['status'] = 'NEW';
    if (isVip) {
      status = 'VIP';
    } else if (daysSinceLastOrder <= 30 && totalOrders > 1) {
      status = 'ACTIVE';
    } else if (daysSinceLastOrder > 30 && daysSinceLastOrder <= 60) {
      status = 'OCCASIONAL';
    } else if (daysSinceLastOrder > 60) {
      status = 'LAPSED';
    } else if (totalOrders === 1) {
      status = 'NEW';
    }

    // Compute favorite products
    const productFrequency: { [name: string]: number } = {};
    for (const ord of data.orders) {
      for (const item of ord.items) {
        productFrequency[item.productName] = (productFrequency[item.productName] || 0) + item.quantity;
      }
    }

    const favoriteItems = Object.entries(productFrequency)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    // Map order history
    const orderHistory = data.orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      date: new Date(o.createdAt),
      total: o.total,
      status: o.status,
      orderType: o.orderType,
      notes: o.notes,
      itemsCount: o.items.reduce((s, it) => s + it.quantity, 0),
      itemNames: o.items.map((it) => it.productName)
    }));

    const primaryName = data.names[0] || 'Valued Patron';
    const primaryArea = data.areas[0] || 'Civil Lines';
    const primaryCity = data.cities[0] || 'Bijnor';

    customerProfiles.push({
      id: data.registeredUserId || `cust_${phone}`,
      phone,
      name: primaryName,
      email: data.emails[0] || null,
      area: primaryArea,
      city: primaryCity,
      totalOrders,
      monthlyOrders,
      isVip,
      totalSpend,
      avgOrderValue,
      lastOrderDate,
      daysSinceLastOrder,
      status,
      favoriteItems,
      orderHistory
    });
  }

  // Sort default: VIP first, then highest spenders
  customerProfiles.sort((a, b) => {
    if (a.isVip && !b.isVip) return -1;
    if (!a.isVip && b.isVip) return 1;
    return b.totalSpend - a.totalSpend;
  });

  // Calculate overall CRM stats
  const totalCustomers = customerProfiles.length;
  const vipCustomers = customerProfiles.filter((c) => c.isVip).length;
  const activeCustomers = customerProfiles.filter((c) => c.daysSinceLastOrder <= 30 && c.totalOrders > 0).length;
  const lapsedCustomers = customerProfiles.filter((c) => c.daysSinceLastOrder > 30 && c.totalOrders > 0).length;
  const totalRevenue = customerProfiles.reduce((sum, c) => sum + c.totalSpend, 0);
  const repeatCustomers = customerProfiles.filter((c) => c.totalOrders >= 2).length;
  const repeatCustomerRate = totalCustomers > 0 ? Math.round((repeatCustomers / totalCustomers) * 100) : 0;
  const averageLtv = totalCustomers > 0 ? Math.round(totalRevenue / totalCustomers) : 0;

  return {
    customers: customerProfiles,
    stats: {
      totalCustomers,
      vipCustomers,
      activeCustomers,
      lapsedCustomers,
      totalRevenue,
      repeatCustomerRate,
      averageLtv
    }
  };
}
