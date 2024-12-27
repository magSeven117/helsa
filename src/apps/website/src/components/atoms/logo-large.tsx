import dark from '@/src/assets/images/logo-large-dark.png';
import light from '@/src/assets/images/logo-large.png';
import { DynamicImage } from './dynamic-image';
export function LogoLarge() {
  return <DynamicImage darkSrc={dark} lightSrc={light} className="w-52" alt="" />;
}
