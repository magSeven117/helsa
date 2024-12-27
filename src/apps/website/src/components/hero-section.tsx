'use client';

import { Button } from '@helsa/ui/components/button';
import Link from 'next/link';
import { HeroImage } from './atoms/hero-image';
import { WordAnimation } from './atoms/word-animation';

export default function HeroSection() {
  return (
    <section className="mt-[60px] lg:mt-[180px] min-h-[530px] relative lg:h-[calc(100vh-300px)]" id="home">
      <div className="flex flex-col">
        <Link href="/updates/october-product-updates">
          <Button variant="outline" className="rounded-full border-border flex space-x-2 items-center">
            <span className="font-mono text-xs">December blog updates</span>
            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none">
              <path
                fill="currentColor"
                d="M8.783 6.667H.667V5.333h8.116L5.05 1.6 6 .667 11.333 6 6 11.333l-.95-.933 3.733-3.733Z"
              />
            </svg>
          </Button>
        </Link>

        <h2 className="mt-6 md:mt-10 max-w-[580px] text-[#878787] leading-tight text-[24px] md:text-[36px] font-medium">
          Online and in-person meetings, medical records, AI health assistant, and more. To help <WordAnimation />
        </h2>

        <div className="mt-8 md:mt-10">
          <div className="flex items-center space-x-4">
            <Link href="https://cal.com/jose-manuel-veliz/15min" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-transparent h-11 px-6 dark:bg-[#1D1D1D] bg-[#F2F1EF]">
                Habla con el creador
              </Button>
            </Link>

            <a href="https://app.helsa.io">
              <Button className="h-11 px-5 text-primary bg-color-brand-primary hover:bg-background hover:text-foreground hover:border-primary border transition-all duration-500 hover:shadow-md">
                Inicia gratis
              </Button>
            </a>
          </div>
        </div>

        <p className="text-xs text-[#707070] mt-4 font-mono">No credit card required. Cancel anytime.</p>
      </div>

      <HeroImage />
    </section>
  );
}
