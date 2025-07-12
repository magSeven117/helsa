import type { CollectionConfig } from 'payload';
import { revalidatePage } from '../utils/revalidate-page';

export const Post: CollectionConfig = {
  slug: 'post',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({ req: { payload }, doc, previousDoc }) => {
        revalidatePage({ collection: 'post', doc, payload });
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      maxLength: 160,
      defaultValue: 'A brief summary of the post.',
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'readTime',
      type: 'text',
      required: true,
      defaultValue: '5 min read',
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: new Date().toISOString(),
    },

    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          value: 'draft',
          label: 'Draft',
        },
        {
          value: 'published',
          label: 'Published',
        },
        {
          value: 'archived',
          label: 'Archived',
        },
      ],
      defaultValue: 'draft',
      required: true,
    },
  ],
};
