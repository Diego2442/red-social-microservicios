'use client'

import { createPost } from "@/actions/create-post-action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export default function CreateForm() {
    const router = useRouter()
    const [state, dispatch] = useActionState(createPost, {
        errors: [],
        success: ''
    })


    useEffect(() => {
        if(state.errors){
            state.errors.forEach(error =>(
                toast.error(error)
            ))
        }
        if(state.success){
            toast.success(state.success)
            router.refresh()
        }
    }, [state])


  return (
    <form className="space-y-4" action={dispatch}>
      <textarea
        placeholder="Cuentanos tus experiencias..."
        className="w-full border px-4 py-2 rounded"
        name="content"
      />
      <input
        type="submit"
        value={'Publicar'}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      />
    </form>
  );
}
