"use client";

import { HandThumbUpIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { Post, User, UserSchema } from "@/src/schema";
import { formatDate } from "@/src/utils";
import { Socket } from "socket.io-client";
import { useStore } from "@/src/store";
import { useRouter } from "next/navigation";

type Props = {
  post: Post;
  token: string;
  socket: Socket | null;
};

export default function PostCard({ post, token, socket }: Props) {
  const router = useRouter();
  const selectUserPost = useStore((state) => state.selectUserPost);
  const handleProfile = () => {
    selectUserPost(user);
    router.push("/auth/profile");
  };

  const [likeCount, setLikeCount] = useState(0);
  const [user, setUser] = useState<User>({
    id: 0,
    full_name: "",
    user_name: "",
    birth_date: "",
  });

  const fetchLikes = () => {
    if (socket) {
      socket.emit("get_likes", post.id);
    }
  };

  const handleLikeClick = async () => {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${url}/api/posts/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ post_id: post.id }),
      });

      if (res.ok) {
        // Emitir para obtener el nuevo conteo de likes
        fetchLikes();
      }
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  useEffect(() => {
    const getUserPost = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL;
        if (!url) return;

        const req = await fetch(`${url}/api/auth/${post.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const res = await req.json();
        const user = UserSchema.parse(res);
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUserPost();
  }, [post.user_id, token]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("get_likes", post.id);

    const handleLikesCount = ({
      postId,
      likeCount,
    }: {
      postId: number;
      likeCount: number;
    }) => {
      if (postId === post.id) {
        setLikeCount(likeCount);
      }
    };

    socket.on("likes_count", handleLikesCount);

    return () => {
      socket.off("likes_count", handleLikesCount);
    };
  }, [socket, post.id]);

  return (
    <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600 dark:text-gray-400">
          {formatDate(post.createdAt)}
        </span>
        <button
          onClick={handleLikeClick}
          className="flex items-center gap-1 px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded hover:bg-gray-500"
        >
          <HandThumbUpIcon className="w-6 h-6 text-cyan-500" />
          <span className="text-sm px-1">{likeCount}</span>
        </button>
      </div>

      <div className="mt-2">
        <a
          href="#"
          className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
        >
          Post
        </a>
        <p className="mt-2 text-gray-600 dark:text-gray-300">{post.content}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <a
          href="#"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Read more
        </a>

        <div className="flex items-center">
          <img
            className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
            src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&auto=format&fit=crop&w=40&q=80"
            alt="avatar"
          />
          <button
            onClick={handleProfile}
            className="font-bold text-gray-700 cursor-pointer dark:text-gray-200"
          >
            {user?.full_name || "Cargando..."}
          </button>
        </div>
      </div>
    </div>
  );
}
