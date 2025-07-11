"use client";

import { useEffect, useMemo, useState } from "react";
import { Post, PostsResponeSchema } from "@/src/schema";
import PostCard from "@/components/posts/PostCard";
import ButtonAddPost from "@/components/posts/ButtonAddPost";
import { useSocket } from "@/hooks/useSocket";

type Props = {
  initialPosts: Post[];
  totalPages: number;
  token: string;
};

export default function PostClient({ initialPosts, totalPages, token }: Props) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddPosts = async () => {
    const nextPage = currentPage + 1;
    if (nextPage > totalPages) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=${nextPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    const postsData = PostsResponeSchema.parse(data);

    setPosts((prev) => [...prev, ...postsData.posts]);
    setCurrentPage(nextPage);
  };

  const socket_url = useMemo(() => process.env.NEXT_PUBLIC_SOCKET_URL!, []);
  const { socket, conectarSocket, desconectarSocket } = useSocket(socket_url!);
  // Conectarse al socket al montar el componente
  useEffect(() => {
  if (!socket) conectarSocket()

  return () => {
    desconectarSocket()
  }
}, [])

  return (
    <div className="grid grid-cols-1 space-y-0.5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} token={token} socket={socket}/>
      ))}

      {currentPage < totalPages && (
        <ButtonAddPost
          currentPage={currentPage}
          handleAddPosts={handleAddPosts}
        />
      )}
    </div>
  );
}
