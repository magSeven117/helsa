import { Button } from '@helsa/ui/components/button';
import AppStoreIcon from '@helsa/ui/components/icons/app-store';
import PlayStorIcon from '@helsa/ui/components/icons/play-store';
import {
  ArrowRight,
  Bell,
  Brain,
  Calendar,
  CheckCircle,
  FileText,
  Globe,
  Heart,
  HeartPulse,
  MessageSquare,
  Smartphone,
  Sparkles,
  Video,
} from 'lucide-react';

const stats = [
  { number: '100+', label: 'Pacientes atendidos' },
  { number: '98%', label: 'Satisfacción del paciente' },
  { number: '24/7', label: 'Disponibilidad' },
  { number: '14 min', label: 'Tiempo promedio de respuesta' },
];

const benefits = [
  {
    icon: <Video className="h-8 w-8" />,
    title: 'Telemedicina',
    description: 'Consultas médicas desde la comodidad de tu hogar con nuestros especialistas certificados.',
    color: 'text-blue-600 bg-blue-100',
    features: ['Consultas en tiempo real', 'Grabación de sesiones', 'Recetas digitales', 'Seguimiento post-consulta'],
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: 'Citas Inteligentes',
    description: 'Sistema avanzado de programación que se adapta a tu horario y preferencias.',
    color: 'text-green-600 bg-green-100',
    features: ['Reserva 24/7', 'Recordatorios automáticos', 'Reprogramación fácil', 'Lista de espera inteligente'],
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Historial Digital',
    description: 'Acceso completo a tu historial médico, resultados de laboratorio y tratamientos.',
    color: 'text-purple-600 bg-purple-100',
    features: ['Acceso 24/7', 'Compartir con especialistas', 'Backup seguro', 'Historial familiar'],
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: 'Monitoreo Continuo',
    description: 'Seguimiento personalizado de tu salud con alertas y recomendaciones proactivas.',
    color: 'text-orange-600 bg-orange-100',
    features: ['Alertas personalizadas', 'Métricas de salud', 'Tendencias y análisis', 'Planes preventivos'],
  },
];
const testimonials = [
  {
    name: 'María González',
    age: '34 años',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    quote:
      'La telemedicina en salud mental me permitió recibir apoyo psicológico desde casa, sin barreras ni estigmas. Mi bienestar ha mejorado notablemente.',
    service: 'Telepsicología',
  },
  {
    name: 'Carlos Mendoza',
    age: '45 años',
    image:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    quote:
      'Gracias a las consultas virtuales con mi terapeuta, he aprendido a gestionar mi ansiedad y mantener el equilibrio emocional en mi día a día.',
    service: 'Terapia Online',
  },
  {
    name: 'Ana Ruiz',
    age: '28 años',
    image:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    quote:
      'La plataforma me brinda acceso rápido a especialistas en salud mental y recursos personalizados. Me siento acompañada en todo momento.',
    service: 'Apoyo Psicológico Digital',
  },
];

const features = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: 'Gestión de Citas Inteligente',
    description: 'Sistema automatizado de programación que optimiza tu agenda y reduce cancelaciones.',
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: 'Comunicación Directa',
    description: 'Plataforma segura de mensajería para mantener contacto directo con terapeutas.',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Asistente Virtual Inteligente',
    description: 'Asistente AI que ayuda a gestionar tareas administrativas y responder preguntas frecuentes.',
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: 'Análisis Predictivo',
    description: 'Herramientas de IA que ayudan en el diagnóstico y predicción de riesgos.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Acceso Remoto',
    description: 'Consulta información de pacientes desde cualquier lugar de forma segura.',
  },
  {
    icon: <HeartPulse className="h-6 w-6" />,
    title: 'Terapeuta de AI',
    description: 'Asistente virtual que ofrece apoyo emocional y recursos de salud mental a pacientes.',
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="bg-violet-100 dark:bg-neutral-900  py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-violet-200 bg-opacity-20 rounded-full">
                <Heart className="h-12 w-12 text-brand-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Descubre la mejor version de ti</h1>
            <p className="text-xl md:text-2xl  leading-relaxed mb-8">
              Encuentra la ayuda para que puedas vivir la vida que mereces. Conecta con profesionales de la salud
              comprometidos con tu bienestar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant={'primary'} size={'lg'}>
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant={'outline'} size={'lg'}>
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-brand-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Main Benefits Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold  mb-4">Una plataforma integral para ti</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aquí encontrarás todas las herramientas que necesitas para recibir la mejor ayuda psicológica y médica
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="rounded-2xl  p-8 border border-brand-primary">
                <div className={`w-16 h-16 ${benefit.color} rounded-xl flex items-center justify-center mb-6`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold  mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{benefit.description}</p>
                <ul className="space-y-3">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold  mb-4">Herramientas Avanzadas</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tecnología de última generación diseñada específicamente para profesionales de la salud.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-muted rounded-xl p-6 ">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-brand-primary">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold  mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold  mb-4">Lo Que Dicen Nuestros Profesionales</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Testimonios reales de médicos que han transformado su práctica con nuestra plataforma.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-background rounded-xl p-8 ">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold ">{testimonial.name}</h4>
                    <p className="text-blue-600 text-sm">{testimonial.service}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed italic">{testimonial.quote} </p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className=" rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold  mb-6">App Móvil Helsa</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Seguimiento emocional</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Terapia online</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Historial psicológico</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground">Recordatorios de autocuidado</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="flex gap-4 justify-center">
                  <Button className=" gap-4">
                    <AppStoreIcon className="size-6" />
                    App Store
                  </Button>
                  <Button className=" gap-4">
                    <PlayStorIcon className="size-6" />
                    Play Store
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold  mb-6">Tu Bienestar Mental en tus Manos</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Descarga nuestra app y accede a herramientas para cuidar tu salud mental. Lleva el control de tu estado
                emocional, conecta con especialistas y recibe apoyo donde y cuando lo necesites.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold  mb-2">Gestión de Sesiones</h4>
                    <p className="text-muted-foreground">
                      Programa, modifica o cancela tus sesiones de terapia fácilmente desde tu móvil.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold  mb-2">Comunicación Segura</h4>
                    <p className="text-muted-foreground">
                      Mantén contacto directo y seguro con tu terapeuta para resolver dudas o recibir apoyo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Bell className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold  mb-2">Recordatorios de Bienestar</h4>
                    <p className="text-muted-foreground">
                      Recibe notificaciones personalizadas para ejercicios de relajación, mindfulness y autocuidado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-brand-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Transformar tu Práctica Médica?</h2>
          <p className="text-xl text-accent-foreground mb-8 max-w-3xl mx-auto">
            Únete a miles de profesionales que ya están revolucionando la atención médica con Helsa Healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant={'outline'} className="text-foreground">
              Comenzar Prueba Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant={'default'}>Solicitar Demo Personalizada</Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">30 días</div>
              <div className="">Prueba gratuita</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">24/7</div>
              <div className="">Soporte técnico</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">0€</div>
              <div className="">Costo de implementación</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
