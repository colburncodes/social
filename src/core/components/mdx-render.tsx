import { Post } from "contentlayer/generated"
import { useMDXComponent } from "next-contentlayer/hooks"


export const MdxRender: React.FC<{post: Post}> = ({ post }) => {
  const MDXContent = useMDXComponent(post.body.code)
  return <MDXContent component={MDXContent} />
}