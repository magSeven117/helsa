import DoctorAppointment from '../components/book-form';

const Page = () => {
  return (
    <DoctorAppointment
      doctor={{
        id: '1',
        name: 'Dr. House',
        specialty: 'Diagnóstico',
        image: '/images/doctor.jpg',
        rating: 2,
      }}
    />
  );
};

export default Page;
