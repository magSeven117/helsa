import { WordAnimation } from '@/src/components/atoms/word-animation';
import { Button } from '@helsa/ui/components/button';
import { Separator } from '@helsa/ui/components/separator';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="min-[1700px]:h-[calc(100vh-100px)] h-[calc(100vh-80px)] ">
      <div id="#hero" className=" h-full overflow-x-hidden flex justify-center">
        <div className="grid lg:grid-cols-2 h-full w-[80%] min-[1700px]:w-2/3 ">
          <div className="flex flex-col items-center lg:items-start justify-center gap-12">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-brand-primary font-semibold text-sm border bg-white py-1 px-4 rounded-lg  group"
            >
              <span className="">Aprende sobre salud mental</span>
              <Separator orientation="vertical" />
              <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all size-4" />
            </Link>
            <div className="flex flex-col items-start justify-center max-w-3xl  gap-2">
              <div className="text-6xl min-[1700px]:text-8xl font-semibold lg:text-start text-center">
                La plataforma que conecta <br /> <WordAnimation />
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <Button className="" variant={'primary'} size={'lg'}>
                Encuentra a tu terapeuta
              </Button>
            </div>
          </div>
          <div className="items-center justify-center 2xl:justify-end hidden lg:flex">
            <div className="flex justify-end items-center w-full h-full ">
              <div className=" max-[1700px]:h-[500px] h-[700px]  rounded-lg bg-brand-primary">
                <video
                  className="  max-[1700px]:h-[500px] h-[700px] rounded-lg -translate-x-[20px] -translate-y-[20px]"
                  autoPlay
                  muted
                  loop
                >
                  <source
                    src="https://tfuwarabgmwgumgearac.supabase.co/storage/v1/object/public/stuff//7525366-hd_1080_1920_25fps.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
