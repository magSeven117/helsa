import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import { Badge } from '@helsa/ui/components/badge';
import { User } from 'lucide-react';

const appointments = [
  {
    id: 'A-1001',
    patientName: 'Emma Wilson',
    time: '10:30 AM',
    duration: '30 min',
    type: 'Seguimiento',
    avatar: '/images/placeholder.svg?height=32&width=32',
  },
  {
    id: 'A-1002',
    patientName: 'James Brown',
    time: '11:45 AM',
    duration: '45 min',
    type: 'Primera cita',
    avatar: '/images/placeholder.svg?height=32&width=32',
  },
  {
    id: 'A-1003',
    patientName: 'Sophia Martinez',
    time: '1:15 PM',
    duration: '30 min',
    type: 'Terapia individual',
    avatar: '/images/placeholder.svg?height=32&width=32',
  },
  {
    id: 'A-1004',
    patientName: 'Robert Johnson',
    time: '2:30 PM',
    duration: '45 min',
    type: 'Evaluación',
    avatar: '/images/placeholder.svg?height=32&width=32',
  },
  {
    id: 'A-1005',
    patientName: 'Olivia Davis',
    time: '3:45 PM',
    duration: '30 min',
    type: 'Alta',
    avatar: '/images/placeholder.svg?height=32&width=32',
  },
];

export function AppointmentsCalendar() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <div className="p-4 rounded-lg bg-brand-primary">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-medium">Actual</h3>
              <p className="text-xs ">En progreso</p>
            </div>
            <Badge className="  border-none">11:45 AM</Badge>
          </div>

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/images/placeholder.svg?height=48&width=48" />
              <AvatarFallback className="">
                <User className="size-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">James Brown</div>
              <div className="text-xs ">Terapia individual • 45 min</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg backdrop-blur-xl bg-sidebar">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-medium">Proxima</h3>
              <p className="text-xs text-muted-foreground">En espera</p>
            </div>
            <Badge variant="outline" className="border-white/20">
              1:15 PM
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/images/placeholder.svg?height=48&width=48" />
              <AvatarFallback className="bg-[#8167ec]/20 text-[#8167ec]">SM</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Sophia Martinez</div>
              <div className="text-xs text-muted-foreground">Seguimiento • 30 min</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium text-sm">Siguientes</h3>
        <div className="space-y-2">
          {appointments
            .filter((_, index) => index > 1)
            .map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#8167ec]/20  border border-transparent hover:border-[#8167ec] backdrop-blur-xl transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={appointment.avatar} />
                    <AvatarFallback className="bg-[#8167ec]/20 text-[#8167ec]">
                      {appointment.patientName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{appointment.patientName}</div>
                    <div className="text-xs text-muted-foreground">
                      {appointment.type} • {appointment.duration}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="border-white/20">
                  {appointment.time}
                </Badge>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
