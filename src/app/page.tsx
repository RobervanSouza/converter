'use client'

import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { mutation } from "../../convex/_generated/server";
import { api } from "../../convex/_generated/api";
 


export default function Home() {
  const salvarMutation = useMutation(api.conectar.saveConvex)


  const {
    register,
    handleSubmit,
 
    formState: { errors },
  } = useForm<{
    prompt: string
  }>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        onSubmit={handleSubmit( async (formData) => {
         const result = await salvarMutation(formData);
         console.log(result)
        })}>
        <input className=" text-black"  {...(register("prompt", { required: true }))} />
        {errors.prompt && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </main>
  );
}
