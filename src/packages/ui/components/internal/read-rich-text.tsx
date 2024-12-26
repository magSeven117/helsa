'use client';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { useMemo } from 'react';
import 'react-quill/dist/quill.bubble.css';
interface ReadRichTextProps {
  value: string;
}
const ReadRichText = ({ value }: ReadRichTextProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  return (
    <div>
      <ReactQuill theme="bubble" value={value} readOnly={true} />
    </div>
  );
};

export default ReadRichText;
