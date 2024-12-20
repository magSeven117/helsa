import { VideoCall } from '@/app/(client)/components/call';
import CallCHat from '@/app/(client)/components/call-chat';
import { generateUserToken } from '@/app/(server)/actions/appointment/generate-user-token';
import { getAppointment } from '@/app/(server)/actions/appointment/get-appointment';
import { getCurrentUser } from '@/app/(server)/actions/user/get-current-user';
import { Button } from '@/libs/shadcn-ui/components/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/libs/shadcn-ui/components/tabs';
import { BookmarkCheck, CalendarClock, LogOut } from 'lucide-react';

const Page = async ({ params }: { params: { id: string } }) => {
  const response = await getAppointment({ appointmentId: params.id });
  const tokenResponse = await generateUserToken();
  const user = await getCurrentUser();
  const appointment = response?.data!;
  return (
    <div className="w-full h-full">
      <div className="flex justify-start items-center px-5 py-7 w-full gap-3">
        <Button className="gap-2" variant={'secondary'}>
          <BookmarkCheck className="size-4" />
          Terminar
        </Button>
        <Button className="gap-2" variant={'secondary'}>
          <CalendarClock className="size-4" />
          Re agendar
        </Button>
        <Button className="gap-2" variant={'destructive'}>
          <LogOut className="size-4" />
          Salir
        </Button>
      </div>
      <div className="w-full h-[80%] px-5 box-border grid grid-cols-6 gap-4">
        <div className="flex flex-col col-span-4 h-full box-border">
          <div className="border h-full flex-col flex gap-2">
            <VideoCall id={params.id} token={tokenResponse?.data ?? ''} user={user?.data!} />
          </div>
        </div>
        <div className="flex flex-col col-span-2 h-full box-border">
          <Tabs defaultValue="chat" className="w-full h-full py-0 flex flex-col justify-between gap-3">
            <TabsList className="flex justify-start items-center bg-transparent w-full gap-2">
              <TabsTrigger value="chat" className="data-[state=active]:border-b border-primary rounded-none ">
                Chat
              </TabsTrigger>
              <TabsTrigger value="notes" className="data-[state=active]:border-b border-primary rounded-none ">
                Notas
              </TabsTrigger>
              <TabsTrigger value="files" className="data-[state=active]:border-b border-primary rounded-none ">
                Archivos
              </TabsTrigger>
              <TabsTrigger value="diagnostic" className="data-[state=active]:border-b border-primary rounded-none ">
                Diagnostico
              </TabsTrigger>
              <TabsTrigger value="recipe" className="data-[state=active]:border-b border-primary rounded-none ">
                Receta
              </TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="">
              <div className="border h-full flex-col flex gap-2">
                <CallCHat id={params.id} user={user?.data!} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Page;
