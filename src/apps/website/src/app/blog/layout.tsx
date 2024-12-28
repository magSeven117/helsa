import { Toolbar } from '@helsa/cms/components';
import type { ReactNode } from 'react';

type BlogLayoutProps = {
  children: ReactNode;
};

const BlogLayout = ({ children }: BlogLayoutProps) => (
  <>
    {children}
    <Toolbar />
  </>
);

export default BlogLayout;
