import { getPatient } from '@/modules/patient/presentation/actions/get-patient';
import { getCurrentUser } from '@/modules/user/presentation/actions/get-current-user';
import PatientInfo from './components/patient-info';

const Page = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  const patient = await getPatient({ id: user.id });
  return (
    <div className="space-y-6 w-full">
      <PatientInfo patient={patient} />
    </div>
  );
};

export default Page;
