'use client'

import { useComplete } from "./context";
import DoctorInfoForm from "./doctor-info-form";
import PatientInfoForm from "./patient-info-form";

const PrincipalInfo = () => {
  const { state } = useComplete();
  if(state.type === 'PATIENT') {
    return <PatientInfoForm></PatientInfoForm>
  };
  if(state.type === 'DOCTOR') {
    return <DoctorInfoForm></DoctorInfoForm>
  }
};

export default PrincipalInfo;