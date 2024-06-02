// contentlayer.config.js

import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    slug: {
      type: 'string',
      required: true
    },
    image: {
      type: 'string',
      required: false
    },
    description: {
      type: 'string',
      required: false
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post.slug}`,
    },
  },
}))

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the doc',
      required: true,
    },
    slug: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: false
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/docs/${doc.slug}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post, Doc],
})