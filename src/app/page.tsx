"use client";
import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { mutation } from "../../convex/_generated/server";
import { api } from "../../convex/_generated/api";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";


export default function Home() {
  const salvarMutation = useMutation(api.conectar.saveConvex);
  const sketchesQuery = useQuery(api.conectar.getConvex);

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{
    prompt: string;
  }>();
  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

      const [selectedImage, setSelectedImage] = useState(null);

      const openModal = (ima: any) => {
        setSelectedImage(ima );
      };

      const closeModal = () => {
        setSelectedImage(null);
      };




  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-slate-50">
      <div>
        <form
          className=" flex flex-col gap-2"
          onSubmit={handleSubmit(async (formData) => {
            if (!canvasRef.current) return;
            const image = await canvasRef.current.exportImage("jpeg");
            console.log(image, "imagem do desenho");
            const result = await salvarMutation({ ...formData, image });
            console.log(result);
          })}>
          <div className=" flex items-center flex-col gap-2">
            <Label htmlFor="email" className=" w-60 items-center text-black">
              Digite a descrição da imagem
            </Label>

            <input
              className="text-black border-2 border-black-500 px-2 py-1 shadow-md w-64"
              {...register("prompt", { required: true })}
            />
            {errors.prompt && <span>This field is required</span>}
            <Label htmlFor="email" className=" w-66 items-center text-black">
              Faça o desenho de uma imagem
            </Label>
            <div className="text-black border-2 border-black-500 px-2 py-1 shadow-md">
              <ReactSketchCanvas
                ref={canvasRef}
                style={{ width: 256, height: 256 }}
                strokeWidth={4}
                strokeColor="black"
              />
            </div>

            <button
              type="reset"
              onClick={() => {
                canvasRef.current?.clearCanvas();
              }}
              className=" rounded bg-blue-700 shadow-md w-60 h-8">
              Reset
            </button>
            <input
              className=" rounded bg-green-700 shadow-md w-60 h-8"
              type="submit"
            />
          </div>
          <section>
            <h2 className=" text-black">Imagens Criadas</h2>

            <div className="grid grid-cols-4 gap-4">
              {sortedSketches.map((sketch) => (
                <img
                  key={sketch._id}
                  width="256"
                  height="256"
                  src={sketch.result}
                  onClick={() => openModal(sketch.result)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
          </section>
        </form>

        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative max-w-full max-h-full">
              <img
                src={selectedImage}
                alt="Imagem em Tamanho Maior"
                className="max-w-full max-h-full"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white bg-red-600">
                Fechar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
