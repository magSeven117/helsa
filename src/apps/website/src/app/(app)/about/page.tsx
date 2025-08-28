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
    color: 'text-[#90BE6D] bg-[#90BE6D]/10',
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: 'Excelencia',
    description:
      'Buscamos los más altos estándares en atención médica, mejorando continuamente nuestros servicios y resultados.',
    color: 'text-[#90BE6D] bg-[#90BE6D]/10',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Colaboración',
    description: 'Trabajamos juntos como equipo, fomentando alianzas con pacientes, familias y la comunidad.',
    color: 'text-[#90BE6D] bg-[#90BE6D]/10',
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: 'Innovación',
    description: 'Adoptamos nuevas tecnologías y métodos para ofrecer soluciones de salud de vanguardia.',
    color: 'text-[#90BE6D] bg-[#90BE6D]/10',
  },
];

function Page() {
  return (
    <main className="flex flex-col items-center w-full min-h-[80vh] py-16 bg-background">
      <section className="min-[1700px]:w-2/3 w-[80%] h-screen grid grid-cols-2 gap-6 ">
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
        <div className="flex justify-end h-full items-center">
          <video
            src="https://tfuwarabgmwgumgearac.supabase.co/storage/v1/object/public/stuff//video%20helsa%202.mp4"
            className=" border rounded-lg "
            autoPlay
            loop
            muted
          ></video>
        </div>
      </section>
      <section className="py-20 bg-gray-50 dark:bg-neutral-900 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mr-4">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold ">Nuestra Misión</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
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
                  <h2 className="text-3xl font-bold ">Nuestra Visión</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ser el proveedor de salud líder en nuestra región, reconocidos por nuestro enfoque innovador,
                  resultados excepcionales y compromiso con el avance de la atención médica para todos. Imaginamos un
                  futuro más saludable donde cada persona tenga acceso a atención médica de clase mundial.
                </p>
              </div>
            </div>

            <div className=" rounded-2xl border border-brand-primary p-8">
              <h3 className="text-2xl font-bold  mb-8 text-center">Nuestro impacto</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-brand-primary mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold  mb-4">Nuestros Valores</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                <h3 className="text-xl font-semibold  mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold  mb-4">Conoce nuestro equipo lider</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Nuestro experimentado equipo médico está dedicado a brindar atención excepcional y liderar la innovación
              en el sector salud.
            </p>
          </div>

          <div className="grid md:grid-cols-2  gap-10">
            <div className=" rounded-xl bg-brand-primary  ">
              <div className="-translate-3 rounded-xl overflow-hidden border border-brand-primary">
                <div className="aspect-square overflow-hidden bg-gray-200 flex items-center justify-center">
                  <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">JV</span>
                  </div>
                </div>
                <div className="p-6 bg-background">
                  <h3 className="text-xl font-semibold  mb-1">Jose Véliz</h3>
                  <p className=" font-medium mb-2">CEO y Fundador</p>
                </div>
              </div>
            </div>
            <div className=" rounded-xl bg-brand-primary">
              <div className="-translate-3 rounded-xl overflow-hidden border border-brand-primary flex flex-col">
                <div className="aspect-square overflow-hidden bg-gray-200 flex items-center justify-center">
                  <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">EF</span>
                  </div>
                </div>
                <div className="p-6 bg-background h-full">
                  <h3 className="text-xl font-semibold  mb-1">Elyana Figueroa</h3>
                  <p className=" font-medium  mb-2">CTO y Fundadora</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Page;
