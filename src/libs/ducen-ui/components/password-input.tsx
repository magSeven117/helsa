'use client'
import { Input, InputProps } from '@/libs/shadcn-ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

interface PasswordInputProps extends InputProps {}
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props: PasswordInputProps, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
      setShowPassword((prev) => !prev)
      showPassword ? console.log('Password is visible') : console.log('Password is hidden')
    };
    return (
      <div className='relative'>
        <Input type={ showPassword ? 'text' : 'password' } {...props} ref={ref}/>
        {
          showPassword ? (
            <EyeOff
              className='absolute right-2 top-2 cursor-pointer'
              onClick={toggleShowPassword}
            />
          ) : (
            <Eye
              className='absolute right-2 top-2 cursor-pointer'
              onClick={toggleShowPassword}
            />
          )
        }
      </div>
    );
  }
)

PasswordInput.displayName = 'PasswordInput';
