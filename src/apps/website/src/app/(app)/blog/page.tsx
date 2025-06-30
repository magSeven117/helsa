import { cn } from '@helsa/ui/lib/utils';
import { Pump } from 'basehub/react-pump';
import { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts, stories and ideas.',
};
const Page = () => {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto flex flex-col gap-14 max-w-7xl">
        <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="max-w-xl font-regular text-3xl tracking-tighter md:text-5xl">Blog</h4>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Pump
            queries={[
              {
                blog: {
                  posts: {
                    items: {
                      _title: true,
                      _slug: true,
                      date: true,
                      image: {
                        url: true,
                      },
                    },
                  },
                },
              },
            ]}
          >
            {async ([data]) => {
              'use server';

              if (!(data as any).blog.posts.items.length) {
                return null;
              }

              return (data as any).blog.posts.items.map((post: any, index: number) => (
                <Link
                  href={`/blog/${post._slug}`}
                  className={cn(
                    'flex cursor-pointer flex-col gap-4 hover:opacity-75 ',
                    !index && 'md:col-span-2 border-b border-brand-primary',
                  )}
                  key={post._slug}
                >
                  <img
                    src={post.image.url}
                    alt={post.image.alt ?? ''}
                    width={post.image.width}
                    height={post.image.height}
                  />
                  <div className="flex flex-row items-center gap-4">
                    <p className="text-muted-foreground text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="max-w-3xl text-4xl tracking-tight">{post._title}</h3>
                    <p className="max-w-3xl text-base text-muted-foreground">{post.description}</p>
                  </div>
                </Link>
              ));
            }}
          </Pump>
        </div>
      </div>
    </div>
  );
};

export default Page;
