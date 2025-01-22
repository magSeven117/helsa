import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@helsa/ui/components/sheet';
import { Textarea } from '@helsa/ui/components/textarea';
import { ExternalLink, FileText, Paperclip, ReceiptText, StickyNote } from 'lucide-react';
import Link from 'next/link';

const DetailsDoctor = ({ data }: { data: Primitives<Appointment> }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ReceiptText className="size-4" />
          Details
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3">
          <SheetHeader className="flex flex-row justify-between items-center gap-4">
            <div className="flex flex-row justify-start items-center gap-4">
              <Avatar className="bg-secondary">
                <AvatarImage className="object-contain" src={data?.doctor?.user?.image} />
                <AvatarFallback>{data?.doctor?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <SheetTitle className="text-xl flex justify-start items-center gap-2">
                  Dr. {data?.doctor?.user?.name}{' '}
                  <Link href={`/patients/${data?.patient?.id}`} target="_blank">
                    <ExternalLink className="size-4 ml-3" />
                  </Link>{' '}
                </SheetTitle>
              </div>
            </div>
          </SheetHeader>
          <div className="flex gap-2 px-1 border-b py-2">
            <div className="flex justify-start items-center gap-2 text-sm">
              <p className="">Especialidad:</p>
              <Badge variant={'outline'}>{data.doctor?.specialty?.name || ''}</Badge>
            </div>
            <div className="flex justify-start items-center gap-2 text-sm">
              <p className="">Nº de Licencia:</p>
              <Badge variant={'outline'}>{data.doctor?.licenseMedicalNumber || ''}</Badge>
            </div>
          </div>
          <div className="space-y-3 px-1 py-3">
            <p className="text-lg ">Detalles</p>
            <p className="text-sm text-muted-foreground">{data?.motive ?? ''}</p>
          </div>
          <div className="space-y-3 px-1 py-3">
            <p className="text-lg ">Síntomas</p>
            <div className="flex justify-start items-center gap-2">
              {data?.symptoms?.map((symptom) => (
                <Badge key={symptom.id} variant={'outline'}>
                  {symptom.name}
                </Badge>
              ))}
            </div>
          </div>
          <Accordion type="multiple" defaultValue={['attachments']} className="w-full px-1">
            <AccordionItem value="attachments">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Archivos y adjuntos <Paperclip className="size-4" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <div className="flex justify-start items-center gap-2 text-muted-foreground">
                  <FileText className="size-4" />
                  <span>Archivo adjunto</span>
                  <span>130 KBs</span>
                </div>
                <div className="flex justify-start items-center gap-2 text-muted-foreground">
                  <FileText className="size-4" />
                  <span>Análisis de sangre</span>
                  <span>130 KBs</span>
                </div>
                <div className="flex justify-start items-center gap-2 text-muted-foreground">
                  <FileText className="size-4" />
                  <span>Archivo adjunto</span>
                  <span>130 KBs</span>
                </div>
                <Button className="w-full gap-3 h-9" variant={'secondary'}>
                  Adjuntar archivo <Paperclip className="size-4" />
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="notes">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Notas <StickyNote className="size-4" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <div className="flex justify-start items-center gap-2 text-muted-foreground">
                  <StickyNote className="size-4" />
                  <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
                </div>
                <div className="flex justify-start items-center gap-2 text-muted-foreground">
                  <StickyNote className="size-4" />
                  <span>Temporibus molestias quibusdam accusantium magni numquam saepe!</span>
                </div>

                <Textarea
                  className="mt-2 rounded-none resize-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                  placeholder="Escribe cualquier comentario"
                ></Textarea>
                <Button className="w-full gap-3 h-9" variant={'secondary'}>
                  Agregar nota <StickyNote className="size-4" />
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailsDoctor;
