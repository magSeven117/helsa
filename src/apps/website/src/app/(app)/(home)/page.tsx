import { WordAnimation } from '@/src/components/atoms/word-animation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@helsa/ui/components/accordion';
import { Button } from '@helsa/ui/components/button';
import { Separator } from '@helsa/ui/components/separator';
import { ArrowUpRight, Calendar, Clock, HandHeartIcon, Heart, Shield, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import DoctorCarousel from './_components/doctor-carousel';
import PatientInfo from './_components/patient-info';

const Page = () => {
  return (
    <div className=" ">
      <div
        id="#hero"
        className="overflow-x-hidden flex justify-center min-[1700px]:h-[calc(100vh-100px)] h-[calc(100vh-80px)]"
      >
        <div className="grid lg:grid-cols-2 h-full w-[80%] min-[1700px]:w-2/3 ">
          <div className="flex flex-col items-center lg:items-start justify-center gap-12">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-brand-primary font-semibold text-sm border bg-white py-1 px-4 rounded-lg  group"
            >
              <span className="">Aprende sobre salud mental</span>
              <Separator orientation="vertical" />
              <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all size-4" />
            </Link>
            <div className="flex flex-col items-start justify-center max-w-3xl  gap-2">
              <div className="text-6xl min-[1700px]:text-8xl font-semibold lg:text-start text-center">
                La plataforma que conecta <br /> <WordAnimation />
              </div>
            </div>
            <div className="flex justify-start items-center gap-4">
              <Button className="" variant={'primary'} size={'lg'}>
                Encuentra a tu terapeuta
              </Button>
            </div>
          </div>
          <div className="items-center justify-center 2xl:justify-end hidden lg:flex">
            <div className="flex justify-end items-center w-full h-full ">
              <div className=" max-[1700px]:h-[500px] h-[700px]  rounded-lg bg-brand-primary">
                <video
                  className="  max-[1700px]:h-[500px] h-[700px] rounded-lg -translate-x-[20px] -translate-y-[20px]"
                  autoPlay
                  muted
                  loop
                >
                  <source
                    src="https://tfuwarabgmwgumgearac.supabase.co/storage/v1/object/public/stuff//7525366-hd_1080_1920_25fps.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="doctors" className="h-[calc(100vh-80px)] flex  justify-center">
        <div className="min-[1700px]:w-2/3 w-[80%]  flex flex-col justify-center gap-4 mb-8">
          <p>
            <span className="text-4xl font-semibold flex items-center gap-2">
              <Stethoscope />
              Próximamente
            </span>
            <br />
            <span className="text-2xl w-full flex justify-between items-center">
              Conoce a los profesionales de la salud mental que se unen a nuestra plataforma.
            </span>
          </p>
          <div className="flex justify-start items-center gap-4">
            <Button className="" variant={'primary'} size={'lg'}>
              Encuentra a tu terapeuta
            </Button>
          </div>
          <DoctorCarousel />
        </div>
      </div>
      <div id="patient-info" className="h-[calc(100vh-80px)] flex  justify-center">
        <div className="min-[1700px]:w-2/3 w-[80%]  flex flex-col justify-center gap-10 mb-8">
          <HandHeartIcon className="size-10" />
          <div className="flex items-start justify-between">
            <p className="text-4xl font-semibold">Una guía durante tu viaje hacia el bienestar mental</p>
            <div className="flex justify-start items-center gap-4">
              <Button className="" variant={'primary'} size={'lg'}>
                Encuentra a tu terapeuta
              </Button>
            </div>
          </div>
          <PatientInfo />
        </div>
      </div>
      <section id="como-funciona" className="w-full py-24 flex items-center  justify-center bg-violet-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Cómo Funciona</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Comenzar tu proceso de bienestar mental es simple y seguro.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4 lg:gap-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-white text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900">Regístrate</h3>
              <p className="text-gray-600">
                Crea tu cuenta de forma segura y completa un breve cuestionario sobre tus necesidades.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-white text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900">Elige tu Profesional</h3>
              <p className="text-gray-600">
                Selecciona al psicólogo o psiquiatra que mejor se adapte a tus necesidades específicas.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-white text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900">Agenda tu Cita</h3>
              <p className="text-gray-600">Programa tu sesión en el horario que mejor te convenga, disponible 24/7.</p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary text-white text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900">Comienza tu Terapia</h3>
              <p className="text-gray-600">
                Inicia tu proceso de bienestar desde la comodidad y privacidad de tu hogar.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen flex  justify-center items-center ">
        <div className=" min-[1700px]:w-2/3 w-[80%]">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center gap-8">
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  ¿Por qué elegir MenteSana?
                </h2>
                <p className="max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestra plataforma está diseñada para brindarte la mejor experiencia en salud mental digital.
                </p>
              </div>
              <div className="grid gap-10">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-brand-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Seguridad y Privacidad</h3>
                    <p className="text-gray-600">
                      Cumplimos con los más altos estándares de seguridad y confidencialidad médica.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-6 w-6 text-brand-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Disponibilidad 24/7</h3>
                    <p className="text-gray-600">Accede a apoyo cuando lo necesites, sin restricciones de horario.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-brand-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Flexibilidad Total</h3>
                    <p className="text-gray-600">Programa y reprograma tus citas según tu disponibilidad.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-6 w-6 text-brand-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Atención Personalizada</h3>
                    <p className="text-gray-600">
                      Cada tratamiento se adapta específicamente a tus necesidades únicas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[500px] rounded-lg bg-brand-primary ">
                <img src="/images/how.jpg" alt="how" className="rounded-lg translate-2" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="faq" className="w-full py-24 flex items-center justify-center bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Preguntas Frecuentes</h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Resuelve tus dudas sobre nuestra plataforma y servicios.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="faq-1">
                <AccordionTrigger>¿Cómo funciona la plataforma?</AccordionTrigger>
                <AccordionContent>
                  Te conectamos con profesionales de la salud mental para que puedas agendar y realizar tus sesiones de
                  manera segura y privada.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>¿Qué tipo de profesionales puedo encontrar?</AccordionTrigger>
                <AccordionContent>
                  Psicólogos y psiquiatras certificados, seleccionados cuidadosamente para atender tus necesidades.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>¿Es confidencial la información que comparto?</AccordionTrigger>
                <AccordionContent>
                  Sí, cumplimos con los más altos estándares de privacidad y seguridad para proteger tus datos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>¿Puedo cambiar de profesional si lo deseo?</AccordionTrigger>
                <AccordionContent>
                  Por supuesto, puedes cambiar de profesional en cualquier momento desde tu perfil.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>¿Cómo agendo una cita?</AccordionTrigger>
                <AccordionContent>
                  Solo debes registrarte, elegir un profesional y seleccionar el horario que más te convenga.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
