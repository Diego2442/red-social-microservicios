
import { PostsResponeSchema } from "@/src/schema";
import getToken from "@/src/auth/token";
import PostClient from "@/components/posts/PostClient";

const getPosts = async (page: number = 1) => {
  const token = await getToken();
  const url = `${process.env.API_URL}/api/posts?page=${page}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
        tags: ['posts'],
    }
  });

  const data = await res.json();
  const postsRes = PostsResponeSchema.parse(data);
  return postsRes;
};

export default async function PostHome() {
  const token = await getToken();
  const postsRes = await getPosts();

  return <PostClient initialPosts={postsRes.posts} totalPages={postsRes.totalPages} token={token!}/>;
}
