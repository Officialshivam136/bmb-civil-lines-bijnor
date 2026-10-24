import React from 'react';
import { getCrmData } from '@/lib/crmService';
import CrmDashboardClient from '@/components/admin/crm/CrmDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminCrmPage() {
  const { customers, stats } = await getCrmData();

  return <CrmDashboardClient initialCustomers={customers} stats={stats} />;
}
