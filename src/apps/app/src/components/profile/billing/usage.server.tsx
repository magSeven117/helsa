import { Usage } from './usage';

export async function UsageServer({ plan }: { plan: string }) {
  return (
    <Usage
      data={{
        total_document_size: 0,
        number_of_users: 6,
        number_of_bank_connections: 2,
        inbox_created_this_month: 36,
        invoices_created_this_month: 28,
      }}
      plan={plan}
    />
  );
}
