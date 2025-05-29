'use client';
import logoWhite from '@/src/assets/images/HELSA NUEVO BLANCO ISOTIPO.png';

const Icon = () => {
  return (
    <>
      {<img src={logoWhite.src} alt="" className="rounded-lg object-contain h-[40px] block" />}
      {/* {<img src={logoDark.src} alt="" className="rounded-lg object-contain h-[40px] hidden dark:block" />} */}
    </>
  );
};

export default Icon;
