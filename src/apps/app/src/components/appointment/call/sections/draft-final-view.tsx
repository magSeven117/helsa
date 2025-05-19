'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Save } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@helsa/ui/components/button';
import { Calendar } from '@helsa/ui/components/calendar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@helsa/ui/components/card';
import { Input } from '@helsa/ui/components/input';
import { Label } from '@helsa/ui/components/label';
import { Popover, PopoverContent, PopoverTrigger } from '@helsa/ui/components/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@helsa/ui/components/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@helsa/ui/components/tabs';
import { Textarea } from '@helsa/ui/components/textarea';

export default function NotasSesion() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Registro de Sesión</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={'outline'} className="w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP', { locale: es }) : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="paciente">Nombre del Paciente</Label>
            <Input id="paciente" placeholder="Nombre completo" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expediente">Número de Expediente</Label>
            <Input id="expediente" placeholder="Ej. EXP-2023-001" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="duracion">Duración de la Sesión</Label>
            <Select>
              <SelectTrigger id="duracion">
                <SelectValue placeholder="Seleccionar duración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutos</SelectItem>
                <SelectItem value="45">45 minutos</SelectItem>
                <SelectItem value="60">60 minutos</SelectItem>
                <SelectItem value="90">90 minutos</SelectItem>
                <SelectItem value="120">120 minutos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo-sesion">Tipo de Sesión</Label>
            <Select>
              <SelectTrigger id="tipo-sesion">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inicial">Evaluación Inicial</SelectItem>
                <SelectItem value="seguimiento">Seguimiento</SelectItem>
                <SelectItem value="crisis">Intervención en Crisis</SelectItem>
                <SelectItem value="familiar">Terapia Familiar</SelectItem>
                <SelectItem value="pareja">Terapia de Pareja</SelectItem>
                <SelectItem value="grupo">Terapia Grupal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estado-animo">Estado de Ánimo/Presentación</Label>
          <Select>
            <SelectTrigger id="estado-animo">
              <SelectValue placeholder="Seleccionar estado de ánimo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eutimico">Eutímico</SelectItem>
              <SelectItem value="deprimido">Deprimido</SelectItem>
              <SelectItem value="ansioso">Ansioso</SelectItem>
              <SelectItem value="irritable">Irritable</SelectItem>
              <SelectItem value="elevado">Elevado</SelectItem>
              <SelectItem value="labil">Lábil</SelectItem>
              <SelectItem value="apatico">Apático</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="contenido" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="contenido">Contenido</TabsTrigger>
            <TabsTrigger value="observaciones">Observaciones</TabsTrigger>
            <TabsTrigger value="plan">Plan</TabsTrigger>
            <TabsTrigger value="adicionales">Notas Adicionales</TabsTrigger>
          </TabsList>
          <TabsContent value="contenido" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="temas">Temas Discutidos</Label>
              <Textarea
                id="temas"
                placeholder="Principales temas abordados durante la sesión"
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tecnicas">Técnicas Utilizadas</Label>
              <Textarea
                id="tecnicas"
                placeholder="Técnicas terapéuticas aplicadas durante la sesión"
                className="min-h-[120px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="observaciones" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="comportamiento">Comportamiento y Actitud</Label>
              <Textarea
                id="comportamiento"
                placeholder="Observaciones sobre el comportamiento y actitud del paciente"
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="progreso">Progreso Terapéutico</Label>
              <Textarea
                id="progreso"
                placeholder="Evaluación del progreso del paciente respecto a sesiones anteriores"
                className="min-h-[120px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="plan" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plan-tratamiento">Plan de Tratamiento</Label>
              <Textarea
                id="plan-tratamiento"
                placeholder="Ajustes al plan de tratamiento y objetivos para próximas sesiones"
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tareas">Tareas Asignadas</Label>
              <Textarea id="tareas" placeholder="Tareas o ejercicios asignados al paciente" className="min-h-[120px]" />
            </div>
          </TabsContent>
          <TabsContent value="adicionales" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medicacion">Medicación</Label>
              <Textarea
                id="medicacion"
                placeholder="Información sobre medicación actual, cambios o efectos observados"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="derivaciones">Derivaciones</Label>
              <Textarea
                id="derivaciones"
                placeholder="Derivaciones a otros profesionales o servicios"
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notas-adicionales">Notas Adicionales</Label>
              <Textarea
                id="notas-adicionales"
                placeholder="Cualquier otra información relevante"
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <Label htmlFor="proxima-cita">Fecha Próxima Cita</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={'outline'} className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Seleccionar fecha</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto" onClick={() => alert('Notas guardadas')}>
          <Save className="mr-2 h-4 w-4" />
          Guardar Notas
        </Button>
      </CardFooter>
    </Card>
  );
}
