import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@helsa/ui/components/dropdown-menu';
import { SidebarMenuButton } from '@helsa/ui/components/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@helsa/ui/components/tabs';
import { Bell, Inbox, Settings } from 'lucide-react';

const SidebarNotifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton tooltip="Notifications" className="bg-background/40">
          <Bell className="h-4 w-4" />
          <span>Notifications</span>
          <Badge className="ml-auto bg-var(--color-brand-primary) text-white">3</Badge>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" sideOffset={8} className="h-[500px] w-[250px] p-0">
        <Tabs defaultValue="inbox">
          <div className="px-4 py-4 border-b flex justify-between items-center">
            <TabsList className="bg-transparent">
              <TabsTrigger value="inbox">Bandeja</TabsTrigger>
              <TabsTrigger value="archive">Archivados</TabsTrigger>
            </TabsList>
            <div>
              <Button variant="ghost" className="rounded-full p-2 size-10">
                <Settings className="size-4" />
              </Button>
            </div>
          </div>
          <TabsContent value="inbox">
            <div className="w-full h-full flex flex-col gap-2 justify-center items-center mt-3">
              <div className="border p-3 rounded-full">
                <Inbox />
              </div>
              <p className="text-muted-foreground text-sm">No hay notificaciones en tu inbox</p>
            </div>
          </TabsContent>
          <TabsContent value="archive">
            <div className="w-full h-full flex flex-col gap-2 justify-center items-center mt-3">
              <div className="border p-3 rounded-full">
                <Inbox />
              </div>
              <p className="text-muted-foreground text-sm">No has archivado mensajes</p>
            </div>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarNotifications;
