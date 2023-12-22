'use client'

import { useMutation } from "convex/react";
import { useForm } from "react-hook-form";
import { mutation } from "../../convex/_generated/server";
import { api } from "../../convex/_generated/api";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef } from "react";
 


export default function Home() {
  const salvarMutation = useMutation(api.conectar.saveConvex)


  const {
    register,
    handleSubmit,
 
    formState: { errors },
  } = useForm<{
    prompt: string
  }>();

   const canvasRef = useRef<ReactSketchCanvasRef>(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
      className=" flex flex-col gap-4"
        onSubmit={handleSubmit(async (formData) => {
          if (!canvasRef.current) return;
          const image = await canvasRef.current.exportImage("jpeg")
          console.log(image, "imagem do desenho")
           const result = await salvarMutation({...formData, image});
           console.log(result);
        })}>
        <input
          className=" text-black"
          {...register("prompt", { required: true })}
        />
        {errors.prompt && <span>This field is required</span>}
        <ReactSketchCanvas
        ref={canvasRef}
          style={{width: 256, height: 256}}    
          strokeWidth={4}
          strokeColor="black"
        />
        <input className=" rounded bg-red-700" type="submit" />
      </form>
    </main>
  );
}
