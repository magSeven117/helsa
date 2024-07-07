import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import 'react-quill/dist/quill.snow.css';
interface EditorRichTextProps {
  placeholder: string;
  onChange: (value: string) => void;
  value?: string;
}
const EditorRichText = ({ onChange, placeholder, value }: EditorRichTextProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  return (
    <div>
      <ReactQuill
        theme='snow'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default EditorRichText;
