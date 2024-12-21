import { VideoCall } from '@/app/(client)/components/call';
import CallCHat from '@/app/(client)/components/call-chat';
import { generateUserToken } from '@/app/(server)/actions/appointment/generate-user-token';
import { getAppointment } from '@/app/(server)/actions/appointment/get-appointment';
import { getCurrentUser } from '@/app/(server)/actions/user/get-current-user';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/libs/shadcn-ui/components/tabs';
import { BookmarkCheck, CalendarClock, MessageCircleOff } from 'lucide-react';

const Page = async ({ params }: { params: { id: string } }) => {
  const response = await getAppointment({ appointmentId: params.id });
  const tokenResponse = await generateUserToken();
  const user = await getCurrentUser();
  const appointment = response?.data!;
  return (
    <Tabs className="w-full h-full flex flex-col justify-between px-5" defaultValue="chat">
      <div className="w-full grid grid-cols-3 gap-3 max-md:grid-cols-1">
        <div>
          <h1 className="text-3xl font-bold">Consulta con</h1>
          <p className="text-lg">Dr. {appointment?.doctor?.user?.name!}</p>
        </div>
        <div className="flex justify-start items-center gap-3 h-full w-full p-0">
          <Button className="rounded-none h-10 py-1.5 gap-2" variant={'secondary'}>
            <BookmarkCheck className="size-4" /> Finalizar
          </Button>
          <Button className="rounded-none h-10 py-1.5 gap-2" variant={'secondary'}>
            <CalendarClock className="size-4" />
            Re agendar
          </Button>
          <Button className="rounded-none h-10 py-1.5 gap-2" variant={'destructive'}>
            <MessageCircleOff className="size-4" />
            Cancelar
          </Button>
        </div>
        <TabsList className="p-0 bg-transparent hover:bg-transparent flex h-full">
          <TabsTrigger
            value="chat"
            className="flex-1 h-10 border border-secondary data-[state=active]:border-primary rounded-none"
          >
            Chat
          </TabsTrigger>
          <TabsTrigger
            value="details"
            className="flex-1 h-10 border border-secondary data-[state=active]:border-primary rounded-none"
          >
            Detalles
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="flex-1 h-10 border border-secondary data-[state=active]:border-primary rounded-none"
          >
            Notas
          </TabsTrigger>
          <TabsTrigger
            value="diagnostic"
            className="flex-1 h-10 border border-secondary data-[state=active]:border-primary rounded-none"
          >
            Diagnostico
          </TabsTrigger>
          <TabsTrigger
            value="recipe"
            className="flex-1 h-10 border border-secondary data-[state=active]:border-primary rounded-none"
          >
            Receta
          </TabsTrigger>
        </TabsList>
      </div>
      <div className="w-full h-full box-border grid grid-cols-8 max-md:grid-cols-1 py-5  gap-4">
        <div className="flex flex-col gap-2 col-span-6 h-full box-border max-md:col-span-1">
          <div className=" h-full flex-col flex gap-2 border">
            <VideoCall id={params.id} token={tokenResponse?.data ?? ''} user={user?.data!} />
          </div>
        </div>
        <TabsContent
          value="chat"
          className="col-span-2 mt-0 h-full border box-border flex-col justify-end flex gap-2 max-md:col-span-1"
        >
          <CallCHat id={params.id} user={user?.data!} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Page;
