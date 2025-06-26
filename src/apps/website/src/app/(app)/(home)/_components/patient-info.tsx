import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Calendar, HandCoins, Stethoscope, WebcamIcon } from 'lucide-react';
const PatientInfo = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="">
        <div className="size-[500px] rounded-lg bg-brand-primary">
          <div className="size-[500px] rounded-lg flex items-center justify-center overflow-hidden translate-x-[20px] translate-y-[20px]">
            <img src="/images/patient-info.jpg" alt="" className="object-contain" />
          </div>
        </div>
      </div>
      <div>
        <Accordion type="multiple" className="space-y-2">
          <AccordionItem value="item-1" className="border rounded-md px-2 border-brand-primary">
            <AccordionTrigger className="text-2xl hover:no-underline cursor-pointer">
              <div className="flex items-center gap-3 ml-3">
                <Stethoscope />
                Encuentra a tu terapeuta adecuado
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3">
              <p className="text-lg">
                En Helsa, entendemos que cada persona es única y que encontrar al terapeuta adecuado es esencial para tu
                bienestar mental. Nuestro equipo de profesionales está aquí para ayudarte a dar ese primer paso hacia
                una vida más saludable y equilibrada.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border rounded-md px-2 border-brand-primary">
            <AccordionTrigger className="text-2xl hover:no-underline cursor-pointer">
              <div className="flex items-center gap-3 ml-3">
                <WebcamIcon />
                Virtual o en persona
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3">
              <p className="text-lg">
                No importa si prefieres una sesión virtual desde la comodidad de tu hogar o una consulta en persona,
                estamos aquí para adaptarnos a tus necesidades. Nuestro objetivo es brindarte un espacio seguro y
                acogedor donde puedas explorar tus pensamientos y emociones sin juicios.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border rounded-md px-2 border-brand-primary">
            <AccordionTrigger className="text-2xl hover:no-underline cursor-pointer">
              <div className="flex items-center gap-3 ml-3">
                <Calendar />
                Amoldado a tu horario y rutina
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3">
              <p className="text-lg">
                Agenda cuando quieras, donde quieras. Nuestro equipo de profesionales está aquí para ayudarte a dar ese
                primer paso hacia una vida más saludable y equilibrada. Ya sea que necesites una sesión rápida o un
                espacio para profundizar en tus preocupaciones, estamos aquí para ti.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border rounded-md px-2 border-brand-primary">
            <AccordionTrigger className="text-2xl hover:no-underline cursor-pointer">
              <div className="flex items-center gap-3 ml-3">
                <HandCoins />
                Accesible y democratizado
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-3">
              <p className="text-lg">
                Creemos que la salud mental debe ser accesible para todos. Por eso, ofrecemos una plataforma que te
                permite encontrar profesionales de la salud mental de manera fácil y rápida. Ya sea que busques terapia
                individual, de pareja o familiar, estamos aquí para ayudarte a encontrar el apoyo que necesitas.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default PatientInfo;
