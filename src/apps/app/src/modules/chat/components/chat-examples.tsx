'use client';

import { motion } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

export const chatExamples = [
  `¿Cuales son mis próximas citas?`,
  `¿Como han estado mis valores biometricos este mes?`,
  '¿Que exámenes de laboratorio tengo pendiente?',
  '¿Cuales son mis medicamentos actuales?',
  '¿Cuales son mis enfermedades crónicas?',
  '¿A que hora es mi próxima medicación?',
];

const listVariant = {
  hidden: { y: 45, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.08,
    },
  },
};

const itemVariant = {
  hidden: { y: 45, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export function ChatExamples({ onSubmit, setInput }: { onSubmit: VoidFunction; setInput: any }) {
  const items = useMemo(() => chatExamples, []);
  const ref = useRef(undefined);
  const { events } = useDraggable(ref as any);

  const totalLength = chatExamples.reduce((accumulator, currentString) => {
    return accumulator + currentString.length * 8.2 + 20;
  }, 0);

  return (
    <div
      className="absolute z-10 bottom-[100px] left-0 right-0 overflow-scroll scrollbar-hide cursor-grabbing hidden md:block no-scroll"
      {...events}
      ref={ref as any}
    >
      <motion.ul
        variants={listVariant}
        initial="hidden"
        animate="show"
        className="flex space-x-4 ml-4 items-center"
        style={{ width: `${totalLength}px` }}
      >
        {items.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => {
              setInput(example);
              onSubmit();
            }}
          >
            <motion.li
              variants={itemVariant}
              className=" text-[#878787] bg-[#F2F1EF] text-xs dark:bg-[#1D1D1D] px-3 py-2 rounded-full cursor-default"
            >
              {example}
            </motion.li>
          </button>
        ))}
      </motion.ul>
    </div>
  );
}
