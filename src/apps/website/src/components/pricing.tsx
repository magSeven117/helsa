'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@helsa/ui/components/tabs';
import { useState } from 'react';
import { PricingSection } from './pricing-section';

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('patients');

  const pricingSections = [
    {
      id: 'patients',
      title: 'Pacientes',
      plans: [
        {
          name: 'Básico',
          price: 'Gratis',
          features: [
            '20 mensajes de acompañante virtual al mes',
            'Acceso a contenido educativo',
            'Recordatorios de medicamentos y exámenes',
            'Reporte emocional diario',
          ],
        },
        {
          name: 'Premium',
          price: '$9.99/mes',
          features: [
            '200 mensajes de acompañante virtual al mes',
            '5 Citas medicas gratuitas al mes',
            'Analisis predictivo con IA del historial y reportes',
            'Canal de chat con doctores',
          ],
        },
        {
          name: 'Familiar',
          price: '$19.99/mes',
          features: [
            'Mensajes ilimitados de acompañante virtual al mes',
            'Hasta 5 miembros del núcleo familiar',
            '10 Citas medicas gratuitas al mes',
            'Canal de chat con doctores para toda la familia',
          ],
        },
      ],
      features: [
        { name: 'Mensajes de acompañante virtual', benefits: ['20', '200', 'Ilimitados'] },
        { name: 'Citas médicas gratuitas', benefits: ['No incluido', '5', '10'] },
        { name: 'Canal de chat con doctores', benefits: ['No incluido', 'Incluido', 'Incluido'] },
        { name: 'Acceso a contenido educativo', benefits: ['Incluido', 'Incluido', 'Incluido'] },
        { name: 'Recordatorios de medicamentos y exámenes', benefits: ['Incluido', 'Incluido', 'Incluido'] },
        { name: 'Reporte emocional diario', benefits: ['Incluido', 'Incluido', 'Incluido'] },
        { name: 'Miembros del núcleo familiar', benefits: ['1', '1', 'Hasta 5'] },
      ],
    },
    {
      id: 'doctors',
      title: 'Doctores',
      plans: [
        {
          name: 'Básico',
          price: 'Gratis',
          features: [
            '20 mensajes de acompañante virtual al mes',
            '5% de comisión por cita',
            '30 minutos de video llamada por consulta',
            'Acceso a contenido educativo',
            'Reporte y análisis del paciente',
          ],
        },
        {
          name: 'Profesional',
          price: '$19.99/mes',
          features: [
            '200 mensajes de acompañante virtual al mes',
            '2% de comisión por cita',
            '60 minutos de video llamada por consulta',
            'Promocion de perfil profesional',
            'Herramientas de visualización y expansion profesional',
          ],
        },
        {
          name: 'Experto',
          price: '$29.99/mes',
          features: [
            'Mensajes ilimitados de acompañante virtual al mes',
            '0% de comisión por cita',
            '90 minutos de video llamada por consulta',
            'Links públicos para citas externas',
            'Integración con EMR',
          ],
        },
      ],
      features: [
        { name: 'Mensajes de acompañante virtual', benefits: ['20', '200', 'Ilimitados'] },
        { name: 'Comisión por cita', benefits: ['5%', '2%', '0%'] },
        { name: 'Duración de video llamada por consulta', benefits: ['30 minutos', '60 minutos', '90 minutos'] },
        { name: 'Acceso a contenido educativo', benefits: ['Incluido', 'Incluido', 'Incluido'] },
        { name: 'Reporte y análisis del paciente', benefits: ['Incluido', 'Incluido', 'Incluido'] },
        { name: 'Promoción de perfil profesional', benefits: ['No incluido', 'Incluido', 'Incluido'] },
        {
          name: 'Herramientas de visualización y expansión profesional',
          benefits: ['No incluido', 'Incluido', 'Incluido'],
        },
        { name: 'Links públicos para citas externas', benefits: ['No incluido', 'No incluido', 'Incluido'] },
        { name: 'Integración con EMR', benefits: ['No incluido', 'No incluido', 'Incluido'] },
      ],
    },
    // {
    //   id: 'hospitals',
    //   title: 'Hospitales',
    //   plans: [
    //     {
    //       name: 'Estándar',
    //       price: '$499/mes',
    //       features: ['Gestión de personal', 'Calendario de citas', 'Hasta 50 doctores'],
    //     },
    //     {
    //       name: 'Avanzado',
    //       price: '$999/mes',
    //       features: ['Todo lo del plan Estándar', 'Integración con laboratorio', 'Hasta 200 doctores'],
    //     },
    //     {
    //       name: 'Empresarial',
    //       price: 'Contactar',
    //       features: ['Todo lo del plan Avanzado', 'Personalización completa', 'Soporte 24/7'],
    //     },
    //   ],
    //   features: [
    //     { name: 'Mensajes de acompañante virtual', benefits: ['20', '200', 'Ilimitados'] },
    //     { name: 'Citas médicas gratuitas', benefits: ['0', '5', '10'] },
    //     { name: 'Canal de chat con doctores', benefits: ['No incluido', 'Incluido', 'Incluido'] },
    //     { name: 'Acceso a contenido educativo', benefits: ['Incluido', 'Incluido', 'Incluido'] },
    //     { name: 'Recordatorios de medicamentos y exámenes', benefits: ['Incluido', 'Incluido', 'Incluido'] },
    //     { name: 'Reporte emocional diario', benefits: ['Incluido', 'Incluido', 'Incluido'] },
    //     { name: 'Miembros del núcleo familiar', benefits: ['1', '1', 'Hasta 5'] },
    //   ],
    // },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-16">Nuestros Planes</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="w-full flex justify-center">
          <TabsList className="">
            {pricingSections.map((section) => (
              <TabsTrigger className="" key={section.id} value={section.id}>
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {pricingSections.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <PricingSection title={section.title} plans={section.plans} features={section.features} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
