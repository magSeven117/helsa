"use client";
/* eslint-disable react/jsx-no-undef */
import { Button } from '@helsa/ui/components/button';
import { Loader2, Weight } from 'lucide-react';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@helsa/ui/components/form';
import { Input } from '@helsa/ui/components/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
    bodyTemp: z.string(),
    heartRate: z.string(),
    systoll: z.string(),
    diastoll: z.string(),
    Weight: z.string(),
    height: z.string(),
    respiratoryRate: z.string(),
    oxygenSatur: z.string(),

});

const Vitals = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bodyTemp: '',
            heartRate: '',
            systoll: '',
            diastoll: '',
            Weight: '',
            height: '',
            respiratoryRate: '',
            oxygenSatur: '',
        },
        mode: 'all',
    });
    const { isSubmitting } = form.formState;
    return (
        <Form {...form}>
            <CardHeader>
                    <CardTitle>
                        Agregar signos vitales
                    </CardTitle>
                    <CardDescription>
                    Asegúrese de que se realicen lecturas precisas, ya que esto puede afectar el diagnóstico y otros procesos médicos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='grid grid-cols-2 gap-5'>
                        <FormField control={form.control}
                            name="bodyTemp"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="text-sm">Temperatura del cuerpo</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="rounded-none"></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}>
                        </FormField>

                        <FormField control={form.control}
                            name="heartRate"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="text-sm">frecuencia cardiaca</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="rounded-none"></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField control={form.control}
                            name="systoll"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="text-sm">PA sistólica</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="rounded-none"></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}>
                        </FormField>

                        <FormField control={form.control}
                            name="diastoll"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="text-sm">PA diastólica</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="rounded-none"></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}>

                        </FormField>

                        <FormField control={form.control}
                            name="Weight"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="text-sm">Peso (Kg)</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="rounded-none"></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}>
                        </FormField>

                        <FormField control={form.control}
                            name="height"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="text-sm">Altura (Cm)</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="rounded-none"></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}>

                        </FormField>
                        <FormField control={form.control}
                            name="respiratoryRate"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="text-sm">Frecuencia respiratoria</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="rounded-none"></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}>
                        </FormField>

                        <FormField control={form.control}
                            name="oxygenSatur"
                            render={({ field }) => (
                                <FormItem className="my-2">
                                    <FormLabel className="text-sm">Saturación de oxígeno</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="rounded-none"></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}>

                        </FormField>
                    </div>
                </CardContent>
                <CardFooter>
                <div className="grid w-full gap-y-4">
                <Button type="submit" className="rounded-none">
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Guardar'}
                </Button>
                </div>
            </CardFooter>

        </Form>
    );
};

export default Vitals;