import { create } from "zustand";
import { User, UserSchema } from "../schema";
import { devtools } from "zustand/middleware";

interface Store {
    auth_user: User
    post_user: User
    addAuthUser: (user: User) => void
    selectUserPost: (user: User) => void
    clearUserPost: () => void
}

const userInitialState = {
    id: 0,
    user_name: '',
    full_name: '',
    birth_date: ''
}

export const useStore = create<Store>()(devtools((set, get) => ({
    auth_user: {},
    post_user: {},
    addAuthUser: (user) => {
        set(() => ({auth_user: user}))
    },
    selectUserPost: async (user: User) => {
        
        set(() => ({
            post_user: user
        }))
    },
    clearUserPost: () => {
        set(() => ({post_user: userInitialState}))
    }
})))