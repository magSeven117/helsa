import { useReducer } from "react";

export type CompleteState = {
  type: "PATIENT" | "DOCTOR";
  doctorData: {
    specialtyId: string;
    licenseNumber: string;
  };
};

export const initialState: CompleteState = {
  type: "PATIENT",
  doctorData: {
    specialtyId: "",
    licenseNumber: "",
  },
};

type SetTypeUser = { type: "SET_TYPE_USER"; payload: "PATIENT" | "DOCTOR" };
type SetDoctorData = {
  type: "SET_DOCTOR_DATA";
  payload: { specialtyId: string; licenseNumber: string };
};

export type CompleteAction = SetTypeUser | SetDoctorData;

const reducers = {
  SET_TYPE_USER: (state: CompleteState, action: SetTypeUser) => ({
    ...state,
    type: action.payload,
  }),
  SET_DOCTOR_DATA: (state: CompleteState, action: SetDoctorData) => ({
    ...state,
    doctorData: action.payload,
  }),
};

export const completeReducer = (state: CompleteState, action: CompleteAction): CompleteState => {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action as never) : state;
};

export function useCompleteStore() {
  const [state, dispatch] = useReducer(completeReducer, initialState);

  const setTypeUser = (payload: "PATIENT" | "DOCTOR") => {
    dispatch({ type: "SET_TYPE_USER", payload });
  };

  const setDoctorData = (payload: { specialtyId: string; licenseNumber: string }) => {
    dispatch({ type: "SET_DOCTOR_DATA", payload });
  };

  return {
    state,
    dispatch,
    setTypeUser,
    setDoctorData,
  };
}

export type CompleteStore = ReturnType<typeof useCompleteStore>;
