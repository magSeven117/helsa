import { getDocuments } from '@/src/actions/appointment/get-documents';
import { getNotes } from '@/src/actions/appointment/get-notes';
import { Primitives } from '@helsa/ddd/types/primitives';
import { Appointment } from '@helsa/engine/appointment/domain/appointment';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { Sheet, SheetContent, SheetTrigger } from '@helsa/ui/components/sheet';
import { Paperclip, ReceiptText, StickyNote } from 'lucide-react';
import { DocumentsContent } from './documents';
import { HeaderDoctor, HeaderPatient } from './headers';
import { NotesContent } from './notes';

const DetailsSheet = async ({ data, user }: { data: Primitives<Appointment>; user: any }) => {
  const [responseDocuments, responseNotes] = await Promise.all([
    getDocuments({ appointmentId: data.id }),
    getNotes({ appointmentId: data.id }),
  ]);
  const documents = responseDocuments?.data ?? [];
  const notes = responseNotes?.data ?? [];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2" variant={'outline'}>
          <ReceiptText className="size-4" />
          Detalles
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-1/3 sm:max-w-full p-4 bg-transparent border-none focus-visible:outline-none ">
        <div className="bg-background p-6 border border-sidebar h-full overflow-y-auto no-scroll space-y-3">
          {user.role === 'DOCTOR' && <HeaderDoctor data={data} />}
          {user.role === 'PATIENT' && <HeaderPatient data={data} />}

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
                <DocumentsContent data={data} patient={user.role === 'PATIENT'} documents={documents} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="notes">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-start items-center gap-2">
                  Notas <StickyNote className="size-4" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-3">
                <NotesContent data={data} patient={user.role === 'PATIENT'} notes={notes} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailsSheet;
