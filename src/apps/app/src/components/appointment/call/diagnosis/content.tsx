'use client';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Diagnostic } from '@helsa/engine/diagnostic/domain/diagnostic';
import { Pathology } from '@helsa/engine/diagnostic/domain/pathology';
import { useState } from 'react';
import DiagnosisForm from './form';
import DiagnosesList from './list';

type Props = {
  data?: Primitives<Appointment>;
  pathologies: Primitives<Pathology>[];
  diagnoses: Primitives<Diagnostic>[];
};
const DiagnosisContent = ({ data, pathologies, diagnoses }: Props) => {
  const [editing, setEditing] = useState(false);
  return (
    <>
      {!editing && (
        <>
          <DiagnosesList
            diagnoses={diagnoses ?? []}
            pathologies={pathologies ?? []}
            toggle={() => setEditing((current) => !current)}
          />
        </>
      )}
      {editing && (
        <DiagnosisForm
          pathologies={pathologies ?? []}
          symptoms={data?.symptoms ?? []}
          appointment={data!}
          toggle={() => setEditing((current) => !current)}
        />
      )}
    </>
  );
};

export default DiagnosisContent;
