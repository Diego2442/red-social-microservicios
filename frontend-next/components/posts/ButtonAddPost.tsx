'use client'

import { Button } from "@headlessui/react";

type ButtonAddPostProps = {
    currentPage: number
    handleAddPosts: (currentPage:number) => void
}

export default function ButtonAddPost({currentPage, handleAddPosts}: ButtonAddPostProps) {
  return (
    <Button
      onClick={() => handleAddPosts(currentPage + 1)}
      className="rounded bg-sky-700 px-4 py-2 text-sm text-white data-active:bg-sky-700 data-hover:bg-sky-500"
    >
      Ver mas
    </Button>
  );
}
