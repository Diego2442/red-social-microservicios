'use client'

import { authenticateUser } from "@/actions/authenticate-user-action";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function FormLogin() {

  const [state, dispatch] = useActionState(authenticateUser, {
    errors: []
  }) 

  useEffect(() => {
    if(state.errors){
      state.errors.forEach(error => (
        toast.error(error)
      ))
    }
  }, [state])
  

  return (
    <form className="space-y-4 md:space-y-6" action={dispatch}>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your username
        </label>
        <input
          type="text"
          name="user_name"
          id="user_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="username"
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <input
        type="submit"
        className="w-full text-white bg-cyan-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        value={'Login'}
      />
    </form>
  );
}
