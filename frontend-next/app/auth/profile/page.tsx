"use client";

import Profile from "@/components/auth/Profile";
import { User } from "@/src/schema";
import { useStore } from "@/src/store";
import { useEffect, useState } from "react";

const initialState = {
  id: 0,
  full_name: "",
  user_name: "",
  birth_date: "",
};

export default function ProfilePage() {
  const [user, setUser] = useState<User>(initialState);

  const { auth_user, post_user } = useStore((state) => state);

  useEffect(() => {
    if (post_user.id !== 0) {
      setUser(post_user);
    } else if (auth_user.id !== 0) {
      setUser(auth_user);
    }
  }, [auth_user, post_user]);

  if (auth_user.id === 0 && post_user.id === 0) {
    return <p>No seleccionaste un usuario...</p>;
  }

  return (
    <>
      <Profile user={user} />
    </>
  );
}
