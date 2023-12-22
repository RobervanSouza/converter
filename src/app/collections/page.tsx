"use client";

import { useMutation, useQuery } from "convex/react";
import { useForm } from "react-hook-form";
import { api } from "../../../convex/_generated/api";



export default function Home() {
  const buscarQuery = useQuery(api.conectar.getConvex);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     {
        buscarQuery?.map((convex) => (
            <div key={convex._id} >
               {convex.prompt}
            </div>
        ))
     }
    </main>
  );
}
