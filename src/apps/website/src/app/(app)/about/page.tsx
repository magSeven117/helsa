import { Button } from '@helsa/ui/components/button';
import { ArrowRight, Award, Globe, Heart, Lightbulb, Target, Users } from 'lucide-react';

export const metadata = {
  title: 'Sobre nosotros',
  description: 'Conoce la misión y el equipo detrás de Helsa',
};

const stats = [
  { number: '3', label: 'Estados cubiertos' },
  { number: '1,000', label: 'Pacientes servidos' },
  { number: '150+', label: 'Profesionales' },
  { number: '12', label: 'Especialidades' },
];
const values = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: 'Cuidado Compasivo',
    description: 'Tratamos a cada paciente con empatía, respeto y dignidad, asegurando su comodidad y bienestar.',
    color: 'text-violet-500 bg-violet-100',
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: 'Excelencia',
    description:
      'Buscamos los más altos estándares en atención médica, mejorando continuamente nuestros servicios y resultados.',
    color: 'text-violet-500 bg-violet-100',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Colaboración',
    description: 'Trabajamos juntos como equipo, fomentando alianzas con pacientes, familias y la comunidad.',
    color: 'text-violet-500 bg-violet-100',
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: 'Innovación',
    description: 'Adoptamos nuevas tecnologías y métodos para ofrecer soluciones de salud de vanguardia.',
    color: 'text-violet-500 bg-violet-100',
  },
];

function Page() {
  return (
    <main className="flex flex-col items-center w-full min-h-[80vh] px-4 py-16 bg-background">
      <section className="min-[1700px]:w-2/3 w-[80%] h-full grid grid-cols-2 gap-6 ">
        <div className="flex flex-col justify-center items-start h-full gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
            Amamos ayudar a las personas a ayudar a otras personas
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Creemos que la terapia es parte esencial de convertirnos en la mejor version de nosotros mismos
          </p>
          <div className="flex items-center gap-4">
            <Button variant={'primary'}>
              Ofrece tus servicios <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <video
            src="https://tfuwarabgmwgumgearac.supabase.co/storage/v1/object/public/stuff//terapy-video.mp4"
            className="h-[80vh] border rounded-lg "
            autoPlay
            loop
            muted
          ></video>
        </div>
      </section>
      <section className="py-20 bg-gray-50 m-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Nuestra Misión</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Brindar servicios de salud integrales, compasivos y accesibles que mejoren la calidad de vida de
                  nuestros pacientes y fortalezcan nuestra comunidad. Estamos comprometidos con la excelencia médica,
                  fomentando la sanación, la esperanza y el bienestar.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mr-4">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Nuestra Visión</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ser el proveedor de salud líder en nuestra región, reconocidos por nuestro enfoque innovador,
                  resultados excepcionales y compromiso con el avance de la atención médica para todos. Imaginamos un
                  futuro más saludable donde cada persona tenga acceso a atención médica de clase mundial.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-brand-primary p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Nuestro impacto</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-brand-primary mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Estos principios fundamentales guían todo lo que hacemos y forman la cultura de excelencia en Helsa
              Healthcare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-200">
                <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced medical professionals are dedicated to providing exceptional care and leading innovation
              in healthcare.
            </p>
          </div>

          <div className="grid md:grid-cols-2  gap-2">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={'https://tfuwarabgmwgumgearac.supabase.co/storage/v1/object/public/stuff//IMG_0457.jpg'}
                  alt={'CEO'}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Jose Véliz</h3>
                <p className=" font-medium mb-2">CEO y Fundador</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={
                    'https://tfuwarabgmwgumgearac.supabase.co/storage/v1/object/public/stuff//8583a296-3e79-45ed-bf82-7853a76653eb.jfif'
                  }
                  alt={'CEO'}
                  className="w-full  object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Elyana Figueroa</h3>
                <p className=" font-medium mb-2">CTO y Fundadora</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Page;
