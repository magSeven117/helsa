import { Avatar, AvatarFallback, AvatarImage } from '@helsa/ui/components/avatar';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import { FileText, MoreHorizontal } from 'lucide-react';

const patients = [
  {
    id: 'P-1001',
    name: 'Emma Wilson',
    age: 42,
    condition: 'Hypertension',
    lastVisit: 'Today, 10:30 AM',
    status: 'Scheduled',
    avatar: '/images/placeholder.svg?height=40&width=40',
  },
  {
    id: 'P-1002',
    name: 'James Brown',
    age: 65,
    condition: 'Diabetes Type 2',
    lastVisit: 'Today, 11:45 AM',
    status: 'In Progress',
    avatar: '/images/placeholder.svg?height=40&width=40',
  },
  {
    id: 'P-1003',
    name: 'Sophia Martinez',
    age: 28,
    condition: 'Pregnancy',
    lastVisit: 'Today, 1:15 PM',
    status: 'Completed',
    avatar: '/images/placeholder.svg?height=40&width=40',
  },
  {
    id: 'P-1004',
    name: 'Robert Johnson',
    age: 72,
    condition: 'Cardiac Arrhythmia',
    lastVisit: 'Today, 2:30 PM',
    status: 'Scheduled',
    avatar: '/images/placeholder.svg?height=40&width=40',
  },
  {
    id: 'P-1005',
    name: 'Olivia Davis',
    age: 35,
    condition: 'Migraine',
    lastVisit: 'Today, 3:45 PM',
    status: 'Scheduled',
    avatar: '/images/placeholder.svg?height=40&width=40',
  },
];

export function PatientsList() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b ">
            <th className="text-left py-3 px-4 font-medium">Patient</th>
            <th className="text-left py-3 px-4 font-medium">Condition</th>
            <th className="text-left py-3 px-4 font-medium">Last Visit</th>
            <th className="text-left py-3 px-4 font-medium">Status</th>
            <th className="text-right py-3 px-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="hover:bg-[#8167ec]/10 border border-transparent hover:border-[#8167ec] backdrop-blur-xl transition-all duration-200"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={patient.avatar} />
                    <AvatarFallback className="bg-[#8167ec]/20 text-[#8167ec]">
                      {patient.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {patient.age} years • {patient.id}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">{patient.condition}</td>
              <td className="py-3 px-4">{patient.lastVisit}</td>
              <td className="py-3 px-4">
                <StatusBadge status={patient.status} />
              </td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" className="hover:bg-[#8167ec]/20 hover:text-[#8167ec]">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-[#8167ec]/20 hover:text-[#8167ec]">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let variant: 'outline' | 'secondary' | 'default' = 'outline';
  let className = 'border-white/20';

  if (status === 'In Progress') {
    variant = 'secondary';
    className = 'bg-[#8167ec]/20 text-[#8167ec] border-[#8167ec]';
  } else if (status === 'Completed') {
    variant = 'default';
    className = 'bg-[#8167ec] text-white border-none';
  }

  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
}
