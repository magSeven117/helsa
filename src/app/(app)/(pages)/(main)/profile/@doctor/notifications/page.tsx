import NotificationControl from "@/app/(app)/components/profile/new/notifications/notification-control";
import { Separator } from "@/libs/shadcn-ui/components/separator";

const Page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Control de notificaciones</h3>
        <p className="text-sm text-muted-foreground">
          Configura las notificaciones que deseas recibir.
        </p>
      </div>
      <Separator />
      <NotificationControl />
    </div>
  );
}

export default Page;
