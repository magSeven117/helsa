import { User } from '@/payload-types';
import { Badge } from '@helsa/ui/components/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@helsa/ui/components/card';
import config from '@payload-config';
import { CalendarDays, Clock, UserIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPayload } from 'payload';

export const dynamic = 'force-dynamic'; // This page should always be revalidated on each request
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts, stories and ideas.',
};
const Page = async () => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: 'post',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 20,
    sort: '-createdAt',
  });
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto flex flex-col gap-14 max-w-7xl">
        <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">Blog</h4>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {docs.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img
                  src={(post.featuredImage as any)?.url || '/placeholder.svg'}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4" variant="default">
                  {post.status}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 hover:text-brand-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">{post.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4" />
                      <span>{(post.author as User).name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4  hover:text-brand-primary font-medium transition-colors"
                >
                  Leer más →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
