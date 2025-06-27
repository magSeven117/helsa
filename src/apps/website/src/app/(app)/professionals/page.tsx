import { Button } from '@helsa/ui/components/button';
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle,
  Clock,
  Globe,
  Heart,
  MessageSquare,
  Shield,
  Smartphone,
  Stethoscope,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';

const stats = [
  { number: '100+', label: 'Profesionales Activos' },
  { number: '98%', label: 'Satisfacción Médica' },
  { number: '45%', label: 'Aumento en Eficiencia' },
  { number: '24/7', label: 'Soporte Técnico' },
];

const benefits = [
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: 'Mayor Alcance de Pacientes',
    description:
      'Expande tu práctica médica y conecta con más pacientes a través de nuestra plataforma digital integrada.',
    color: 'text-violet-500 bg-violet-100',
    features: ['Red de pacientes ampliada', 'Referidos automáticos', 'Visibilidad profesional'],
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: 'Control Avanzado de Pacientes',
    description:
      'Sistema integral de gestión que te permite monitorear y controlar el progreso de tus pacientes en tiempo real.',
    color: 'text-violet-500 bg-violet-100',
    features: ['Historial médico completo', 'Seguimiento en tiempo real', 'Alertas automáticas'],
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: 'Recursos Educativos Continuos',
    description: 'Acceso a una biblioteca extensa de recursos médicos, cursos y actualizaciones profesionales.',
    color: 'text-violet-500 bg-violet-100',
    features: ['Cursos especializados', 'Webinars exclusivos', 'Certificaciones médicas'],
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: 'Tecnología de Vanguardia',
    description:
      'Herramientas tecnológicas avanzadas que optimizan tu práctica médica y mejoran la atención al paciente.',
    color: 'text-violet-500 bg-violet-100',
    features: ['Telemedicina integrada', 'IA diagnóstica', 'Apps móviles'],
  },
];
const testimonials = [
  {
    name: 'Dr. María González',
    specialty: 'Cardióloga',
    image:
      'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    quote:
      'La plataforma ha revolucionado mi práctica. El control de pacientes es excepcional y los recursos educativos me mantienen actualizada constantemente.',
  },
  {
    name: 'Dr. Carlos Mendoza',
    specialty: 'Cirujano Ortopédico',
    image:
      'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    quote:
      'He aumentado mi base de pacientes en un 60% desde que uso Helsa Healthcare. La tecnología realmente marca la diferencia.',
  },
  {
    name: 'Dra. Ana Ruiz',
    specialty: 'Pediatra',
    image:
      'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    quote:
      'Los recursos educativos y la facilidad de seguimiento de pacientes han mejorado significativamente la calidad de mi atención médica.',
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
    description: 'Plataforma segura de mensajería para mantener contacto directo con pacientes.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Seguridad de Datos',
    description: 'Protección avanzada de información médica con estándares internacionales.',
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
    icon: <Award className="h-6 w-6" />,
    title: 'Desarrollo Profesional',
    description: 'Programas de certificación y desarrollo continuo de competencias médicas.',
  },
];

export default function Page() {
  return (
    <div className="min-h-screen">
      <section className="bg-violet-100  py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-violet-200 bg-opacity-20 rounded-full">
                <Stethoscope className="h-12 w-12 text-brand-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Potencia Tu Práctica Médica</h1>
            <p className="text-xl md:text-2xl  leading-relaxed mb-8">
              Únete a miles de profesionales que han transformado su práctica médica con nuestra plataforma integral de
              salud digital.
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
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Main Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Beneficios Exclusivos para Profesionales
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre cómo nuestra plataforma puede transformar tu práctica médica y mejorar la atención a tus
              pacientes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl  p-8 border border-brand-primary">
                <div className={`w-16 h-16 ${benefit.color} rounded-xl flex items-center justify-center mb-6`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{benefit.description}</p>
                <ul className="space-y-3">
                  {benefit.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Herramientas Avanzadas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tecnología de última generación diseñada específicamente para profesionales de la salud.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-brand-primary">{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-brand-primary" />
                </div>
                s<h2 className="text-3xl md:text-4xl font-bold text-gray-900">Educación Médica Continua</h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Mantente actualizado con los últimos avances médicos a través de nuestros recursos educativos
                especializados.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-4 w-4 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Cursos Especializados</h4>
                    <p className="text-gray-600">Acceso a más de 500 cursos médicos actualizados mensualmente.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Webinars en Vivo</h4>
                    <p className="text-gray-600">Sesiones interactivas con expertos internacionales cada semana.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Certificaciones</h4>
                    <p className="text-gray-600">Obtén certificaciones reconocidas internacionalmente.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Centro de Conocimiento</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-primary">500+</div>
                    <div className="text-sm text-gray-600">Cursos Disponibles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-primary">50+</div>
                    <div className="text-sm text-gray-600">Especialidades</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-primary">24h</div>
                    <div className="text-sm text-gray-600">Acceso Continuo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-brand-primary">95%</div>
                    <div className="text-sm text-gray-600">Satisfacción</div>
                  </div>
                </div>
                <button className="w-full bg-brand-primary text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                  Explorar Recursos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo Que Dicen Nuestros Profesionales</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Testimonios reales de médicos que han transformado su práctica con nuestra plataforma.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-blue-600 text-sm">{testimonial.specialty}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed italic">{testimonial.quote} </p>
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
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Tecnología de Vanguardia</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Inteligencia Artificial</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-14 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Análisis Predictivo</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-12 h-2 bg-green-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Telemedicina</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-15 h-2 bg-purple-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Seguridad de Datos</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div className="w-16 h-2 bg-red-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-brand-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Innovación Constante</h2>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Nuestra plataforma evoluciona constantemente para ofrecerte las herramientas más avanzadas del mercado.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Heart className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">IA para Diagnóstico</h4>
                    <p className="text-gray-600">
                      Algoritmos avanzados que asisten en el proceso diagnóstico y reducen errores médicos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Clock className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Automatización Inteligente</h4>
                    <p className="text-gray-600">
                      Procesos automatizados que optimizan tu tiempo y mejoran la eficiencia operativa.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Seguridad Avanzada</h4>
                    <p className="text-gray-600">
                      Protección de datos médicos con los más altos estándares de seguridad internacional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-brand-primary text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para Transformar tu Práctica Médica?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
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
