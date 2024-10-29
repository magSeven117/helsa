import { UseFormReturn } from 'react-hook-form';

type Props = {
  role: string;
  form: UseFormReturn;
}

const IndividualForm = (params: Props) => {
  return (
    <div>
      { params.role === 'PATIENT' && (<>Paciente</>) }
      { params.role === 'DOCTOR' && (<>Paciente</>) } 
      { params.role === 'HOSPITAL' && (<>Paciente</>) } 
    </div>
  );
}

export default IndividualForm;
