import { User } from '@/payload-types';
import { Content } from '@/src/components/content';
import { Badge } from '@helsa/ui/components/badge';
import { Button } from '@helsa/ui/components/button';
import config from '@payload-config';
import { ArrowLeft, CalendarDays, Clock, Share2, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { getPayload } from 'payload';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'post',
    where: {
      slug: {
        equals: id,
      },
    },
  });
  const post = docs[0];
  return (
    <div className="min-h-screen ">
      {/* Navigation */}
      <nav className="border-b  backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver al Blog
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="aspect-[21/9] bg-muted relative overflow-hidden">
        <img
          src={(post.featuredImage as any)?.url || '/placeholder.svg'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 " />
        <Badge className="absolute bottom-6 left-6" variant="default">
          {post.status}
        </Badge>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold  mb-6 leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              <span className="font-medium">{(post.author as User).email}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              <span>
                {new Date(post.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime} de lectura</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Compartir
            </Button>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none">
          <Content content={post.content} />
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="font-semibold ">{(post.author as User).name}</p>
                <p className="text-muted-foreground text-sm">Autor del artículo</p>
              </div>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Share2 className="w-4 h-4" />
              Compartir artículo
            </Button>
          </div>
        </footer>
      </article>
    </div>
  );
};

export default Page;
