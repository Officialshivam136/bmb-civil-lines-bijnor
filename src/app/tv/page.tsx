import { getTvOrders } from '@/lib/orderService';
import TvDisplayClient from '@/components/tv/TvDisplayClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Live TV Order Display • Bikaner Misthan Bhandar',
  description: 'Live token counter display for Bikaner Misthan Bhandar, Civil Lines, Bijnor'
};

export default async function TvPage() {
  const { received, preparing, ready } = await getTvOrders();

  return (
    <TvDisplayClient
      initialReceived={received}
      initialPreparing={preparing}
      initialReady={ready}
    />
  );
}
