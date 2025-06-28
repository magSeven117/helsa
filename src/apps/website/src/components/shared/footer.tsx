import Github from '@helsa/ui/components/icons/github';
import LinkedIn from '@helsa/ui/components/icons/linkedin';
import XIcon from '@helsa/ui/components/icons/x';
import { Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { HelsaCompleteLogo } from './helsa-icon';

export default function Footer() {
  return (
    <footer className="overflow-hidden py-8 space-y-12 px-3">
      <div className="flex items-center justify-center w-full py-4">
        <HelsaCompleteLogo className="h-16" />
      </div>
      <div className="flex items-center justify-center w-full py-2 text-lg gap-6 font-semibold flex-wrap">
        <Link href={''} className="underline">
          Nosotros
        </Link>
        <Link href={''} className="underline">
          Terapeutas
        </Link>
        <Link href={''} className="underline">
          Blog
        </Link>
        <Link href={''} className="underline">
          Recursos
        </Link>
        <Link href={''} className="underline">
          Beneficiencia
        </Link>
      </div>
      <div className="flex items-center justify-center w-full py-2 gap-6">
        <Link
          href="https://instagram.com"
          className="rounded-full bg-brand-primary text-white p-3 hover:bg-violet-500 transition-colors"
        >
          <Instagram size={20} />
        </Link>
        <Link
          href="https://facebook.com"
          className="rounded-full bg-brand-primary text-white p-3 hover:bg-violet-500 transition-colors"
        >
          <Facebook size={20} />
        </Link>
        <Link
          href="https://linkedin.com"
          className="rounded-full bg-brand-primary text-white p-3 hover:bg-violet-500 transition-colors"
        >
          <LinkedIn color="#fff" />
        </Link>
        <Link
          href="https://twitter.com"
          className="rounded-full bg-brand-primary text-white p-3 hover:bg-violet-500 transition-colors"
        >
          <XIcon />
        </Link>
        <Link
          href="https://twitter.com"
          className="rounded-full bg-brand-primary text-white p-3 hover:bg-violet-500 transition-colors"
        >
          <Github />
        </Link>
      </div>
      <div className="flex items-center justify-center w-full py-2 text-lg gap-6 font-semibold text-muted-foreground flex-wrap">
        <Link href={''}>Aviso legal</Link>
        <Link href={''}>Condiciones generales</Link>
        <Link href={''}>Política de privacidad</Link>
        <Link href={''}>Recursos</Link>
        <Link href={''}>Política de cookies</Link>
      </div>
    </footer>
  );
}
