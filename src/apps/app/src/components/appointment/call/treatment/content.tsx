'use client';

import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Treatment } from '@helsa/engine/treatment/domain/treatment';
import { useState } from 'react';
import TreatmentForm from './form';
import TreatmentList from './list';

type Props = {
  data: Primitives<Appointment>;
  treatments: Primitives<Treatment>[];
};

const TreatmentContent = ({ data, treatments }: Props) => {
  const [editing, setEditing] = useState(false);
  return (
    <>
      {!editing && <TreatmentList treatments={treatments ?? []} toggle={() => setEditing((current) => !current)} />}
      {editing && (
        <TreatmentForm
          appointment={data}
          toggle={() => {
            setEditing(false);
          }}
        />
      )}
    </>
  );
};

export default TreatmentContent;
