import { basehub, fragmentOn } from 'basehub';
const imageFragment = fragmentOn('BlockImage', {
  url: true,
  width: true,
  height: true,
  alt: true,
  blurDataURL: true,
});

const postFragment = fragmentOn('PostsItem', {
  _id: true,
  image: imageFragment,
  _title: true,
  date: true,
  summary: true,
});

export const blog = {
  getPosts: {
    blog: {
      posts: {
        items: postFragment,
      },
    },
  } as const,
  getPost: (id: string) => ({
    blog: {
      posts: {
        __args: {
          filter: {
            _sys_id: { eq: id },
          },
        },
        items: postFragment,
      },
    },
  }),
  fetchPosts: async () => {
    const data = await basehub().query(blog.getPosts);
    return data.blog.posts.items;
  },
};
