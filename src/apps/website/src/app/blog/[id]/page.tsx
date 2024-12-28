import { blog } from '@helsa/cms';
import { Feed, Image } from '@helsa/cms/components';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <Feed queries={[blog.getPost(params.id)]} draft={false}>
      {async ([data]) => {
        'use server';

        const [page] = data.blog.posts.items;

        return (
          <>
            <div className="container py-16">
              <Link
                className="mb-4 inline-flex items-center gap-1 text-muted-foreground text-sm focus:underline focus:outline-none"
                href="/blog"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Blog
              </Link>
              <div className="mt-16 flex flex-col items-start gap-8 sm:flex-row">
                <div className="sm:flex-1">
                  <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
                      <Balancer>{page._title}</Balancer>
                    </h1>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                      <Balancer>{page.summary}</Balancer>
                    </p>
                    {page.image ? (
                      <Image
                        src={page.image.url}
                        width={page.image.width}
                        height={page.image.height}
                        alt={page.image.alt ?? ''}
                        className="my-16 h-full w-full rounded-xl"
                        priority
                      />
                    ) : undefined}
                    <div className="mx-auto max-w-prose">{page.summary}</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </Feed>
  );
};

export default Page;
