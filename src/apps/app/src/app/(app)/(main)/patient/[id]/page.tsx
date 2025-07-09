import HeaderPatient from '@/src/modules/patient/components/details/header';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="py-6">
      <HeaderPatient id={id} />
    </div>
  );
};

export default Page;
