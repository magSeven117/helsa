'use client';

import { Button } from '@/libs/shadcn-ui/components/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/libs/shadcn-ui/components/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs/shadcn-ui/components/select';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Activity,
  Bone,
  Brain,
  Droplet,
  Heart,
  Loader2,
  Pencil,
  Shield,
  Stethoscope,
  Sun,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  specialtyId: z.string().optional(),
});

type SpecialtyFormValue = z.infer<typeof formSchema>;

export const SpecialtyForm = ({ specialtyId }: SpecialtyFormValue) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { specialtyId },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (data: SpecialtyFormValue) => {
    console.log(data);
  };

  const selectedSpecialty = specialties.find((specialty) => specialty.id === specialtyId);

  return (
    <div className="mt-6 border-b pb-2">
      <div className="font-bold flex items-center gap-3">
        Correo electrónico
        <Button variant="ghost" onClick={toggleEdit} className="w-6 h-6 p-1 flex justify-center items-center">
          {isEditing ? (
            <>
              <X className="size-3" />
            </>
          ) : (
            <>
              <Pencil className="size-3" />
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className="flex gap-2 items-center">{selectedSpecialty?.name}</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
            <div className="flex justify-between items-center gap-3">
              <FormField
                control={form.control}
                name="specialtyId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem
                            key={specialty.id}
                            value={specialty.id}
                            
                          >
                            <span className="flex w-full justify-between items-center gap-3">
                              <specialty.icon className="size-4" />
                              {specialty.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

const specialties = [
  { id: '1', name: 'Cardiología', icon: Heart },
  { id: '2', name: 'Dermatología', icon: Sun },
  { id: '3', name: 'Endocrinología', icon: Activity },
  { id: '4', name: 'Gastroenterología', icon: Stethoscope },
  { id: '5', name: 'Geriatría', icon: User },
  { id: '6', name: 'Hematología', icon: Droplet },
  { id: '7', name: 'Infectología', icon: Shield },
  { id: '11', name: 'Neurología', icon: Brain },
  { id: '15', name: 'Reumatología', icon: Bone },
];
