'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/libs/shadcn-ui/components/avatar';
import { forwardRef, useRef } from 'react';

interface AvatarInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelectFile: (file: File) => void;
}
const AvatarInput = forwardRef<HTMLInputElement, AvatarInputProps>(({ onChange, value, onSelectFile }, ref) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const openFilePicker = () => {
    inputFileRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file);
      onChange(URL.createObjectURL(file));
      onSelectFile(file);
    }
  };


  return (
    <div className="cursor-pointer">
      <Avatar className="h-14 w-14 rounded-full" onClick={openFilePicker}>
        <AvatarImage src={value || ''} alt={'avatar'} className='object-contain'/>
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <input ref={inputFileRef} type="file" className="hidden " onChange={handleChange}/>
    </div>
  );
});
AvatarInput.displayName = 'AvatarInput';

export default AvatarInput;
