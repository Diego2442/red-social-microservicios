// components/SetAuthUser.tsx
'use client'

import { useStore } from "@/src/store"
import { User } from "@/src/schema"
import { useEffect } from "react"

export default function SetAuthUser({ user }: { user: User }) {
  const addAuthUser = useStore(state => state.addAuthUser)

  // Este efecto evita doble ejecución innecesaria en desarrollo (React StrictMode)
  useEffect(() => {
    addAuthUser(user)
  }, [user, addAuthUser])

  return null
}