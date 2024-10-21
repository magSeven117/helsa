'use client';
import { Button } from '@/libs/shadcn-ui/components/button';
import { UploadCloud } from 'lucide-react';
import { forwardRef, useEffect, useRef } from 'react';

interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
  onSelectFile: (file: File) => void;
}
const ImagePicker = forwardRef<HTMLInputElement, ImagePickerProps>(
  ({ onChange, value, onSelectFile }, ref) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const openFilePicker = () => {
      inputFileRef.current?.click();
    };
    const handleChange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        onChange(URL.createObjectURL(file));
        onSelectFile(file);
      }
    };
    useEffect(() => {
      inputFileRef.current?.addEventListener('change', handleChange);
      return () => {
        inputFileRef.current?.removeEventListener('change', handleChange);
      };
    }, []);
  
    return (
      <div className="flex gap-3 items-center mb-6">
        
        {value !== '' && (
          <div className='w-[90px] h-[90px] rounded-full  border border-foreground flex justify-center items-center overflow-hidden'>
            <img
              src={value}
              alt="course-image"
              className="object-contain w-full h-full"
            />
          </div>
        )}
        <Button className="bg-muted text-foreground gap-1 text-sm hover:bg-foreground hover:text-background" onClick={openFilePicker}>
          <UploadCloud className=""></UploadCloud>
          Upload new image
        </Button>
        <input ref={inputFileRef} type="file" className="hidden " />
      </div>
    );
  }
);
ImagePicker.displayName = 'ImagePicker';

export default ImagePicker;
