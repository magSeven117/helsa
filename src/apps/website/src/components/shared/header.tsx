'use client';
import { Button } from '@helsa/ui/components/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@helsa/ui/components/navigation-menu';
import Link from 'next/link';
import { useState } from 'react';
import { HelsaCompleteLogo } from './helsa-icon';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 hidden  md:flex justify-center w-full bg-white h-[80px] min-[1700px]:h-[100px]">
      <div className="w-[80%] min-[1700px]:w-2/3 flex items-center justify-between gap-10  lg:py-3 container relative  rounded-lg">
        <div className="flex items-center gap-4">
          <Link className="flex items-center gap-2" href="/">
            <HelsaCompleteLogo className="object-contain" />
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg">Nosotros</NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="grid gap-2 min-h-[300px] md:w-[400px] lg:w-[800px]  lg:grid-cols-[1fr_1fr] ">
                  <li className="col-span-2 h-[200px]">
                    <NavigationMenuLink asChild className="rounded-lg hover:bg-brand-primary">
                      <a className=" flex h-full w-full  overflow-hidden  select-none focus:shadow-md p-2" href="/">
                        <div className="relative flex h-full p-2 flex-col rounded-md justify-end overflow-hidden ">
                          <div className="mt-4 mb-2 text-lg font-medium z-10">¿Quienes somos?</div>
                          <p className=" text-sm leading-tight z-10">
                            Una comunidad de terapeutas y pacientes que buscan mejorar la salud mental.
                          </p>
                          <img src="/images/nav-about-us.jpg" alt="" className="absolute bottom-0 left-0 right-0 " />
                          <div className="absolute  left-0 right-0 top-0 bottom-0 bg-linear-to-b from-white/10 to-white/90"></div>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>

                  <ListItem href="/docs/primitives/typography" title="Mision y visión">
                    Nuestra misión es mejorar la salud mental de las personas.
                  </ListItem>
                  <ListItem href="/docs/primitives/typography" title="Blog">
                    Artículos y recursos sobre salud mental.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg">Para proveedores</NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="grid gap-2 min-h-[300px] md:w-[400px] lg:w-[800px]  lg:grid-cols-[1fr_1fr]">
                  <ListItem href="/docs" title="Mejor exposición">
                    Mejora tu exposición y visibilidad como terapeuta.
                  </ListItem>
                  <ListItem href="/docs" title="Control total">
                    Control total sobre tu agenda y tarifas.
                  </ListItem>
                  <ListItem href="/docs" title="Seguimiento de pacientes">
                    Lleva un seguimiento de tus pacientes y su progreso.
                  </ListItem>

                  <ListItem href="/docs/installation" title="Convenciones">
                    Quieres tener acceso a conferencias y eventos exclusivos.
                  </ListItem>
                  <li className="row-span-4 col-start-2 row-start-1">
                    <NavigationMenuLink asChild className="rounded-lg hover:bg-brand-primary">
                      <a className=" flex h-full w-full  overflow-hidden  select-none focus:shadow-md p-2 " href="/">
                        <div className="relative flex h-full p-2  flex-col rounded-md justify-end overflow-hidden">
                          <div className="mt-4 mb-2 text-lg font-medium z-10">¿Quieres formar parte?</div>
                          <p className=" text-sm leading-tight z-10">
                            Únete a nuestra comunidad de terapeutas y mejora tu práctica profesional.
                          </p>
                          <img
                            src="/images/nav-professional.jpg"
                            alt=""
                            className="absolute top-0  bottom-0 w-full h-full  left-0 right-0 rounded-md "
                          />
                          <div className="rounded-md absolute bottom-0 left-0 right-0 top-0 bg-linear-to-b from-white/10 to-white/90"></div>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg">Para pacientes</NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="grid gap-2 h-[350px] md:w-[400px] lg:w-[800px]  md:grid-cols-3 ">
                  <li className="row-span-4 h-full">
                    <NavigationMenuLink asChild className="rounded-lg hover:bg-brand-primary">
                      <a className=" flex h-full w-full  overflow-hidden  select-none focus:shadow-md p-2 " href="/">
                        <div className="relative flex h-full p-2  flex-col rounded-md justify-end overflow-hidden">
                          <div className="mt-4 mb-2 text-lg font-medium z-10">Atencion personal</div>
                          <p className=" text-sm leading-tight z-10">
                            Encuentra un terapeuta que se adapte a tus necesidades y preferencias.
                          </p>
                          <img
                            src="/images/nav-user.jpg"
                            alt=""
                            className="absolute top-0  bottom-0  left-0 right-0 h-full object-cover rounded-md"
                          />
                          <div className="rounded-md absolute bottom-0 left-0 right-0 top-0 bg-linear-to-b from-white/10 to-white/90"></div>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li className="row-span-4 h-full">
                    <NavigationMenuLink asChild className="rounded-lg hover:bg-brand-primary">
                      <a className=" flex h-full w-full  overflow-hidden  select-none focus:shadow-md p-2 " href="/">
                        <div className="relative flex h-full p-2  flex-col rounded-md justify-end overflow-hidden">
                          <div className="mt-4 mb-2 text-lg font-medium z-10">Terapia de parejas</div>
                          <p className=" text-sm leading-tight z-10">
                            Mejora la comunicación y la conexión con tu pareja a través de la terapia.
                          </p>
                          <img
                            src="/images/nav-user-3.jpg"
                            alt=""
                            className="absolute top-0  bottom-0  left-0 right-0 h-full object-cover rounded-md"
                          />
                          <div className="rounded-md absolute bottom-0 left-0 right-0 top-0 bg-linear-to-b from-white/10 to-white/90"></div>
                        </div>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs/installation" title="Educación">
                    Accede a recursos educativos y herramientas para mejorar tu salud mental.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Seguros">
                    Si tienes un seguro de salud, verifica si cubre nuestros servicios.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Comunidad">
                    Únete a nuestra comunidad de pacientes y comparte tus experiencias.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Ayuda">
                    Si necesitas ayuda, contáctenos y te guiaremos en el proceso.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/docs">Precios</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/docs">Como funciona</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex justify-between items-center gap-2  pl-3">
          <Link href={'https://app.helsa.com/sign-in'}>
            <Button variant={'outline'} size={'sm'}>
              Entrar
            </Button>
          </Link>
          <Link href={'https://app.helsa.com/sign-up'}>
            <Button size={'sm'} variant={'primary'}>
              Registrarse
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

function ListItem({ title, children, href, ...props }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
  return (
    <li {...props} className="h-full">
      <NavigationMenuLink asChild className="hover:bg-brand-primary hover:text-white">
        <Link href={href} className="h-full">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className=" line-clamp-2 text-sm leading-snug">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
