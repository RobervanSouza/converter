"use node"

import { internalAction, internalMutation } from "./_generated/server";
import { api, internal } from "./_generated/api";
import Replicate from "replicate";
import { Id } from "./_generated/dataModel";

export const generate = internalAction(
  async (
    { runMutation },
    {
      prompt,
      image,
      resultId,
    }: { resultId: Id<"conectar">; prompt: string; image: string }
  ) => {
    const replicate = new Replicate({
      auth: "r8_KqZNBZjvbQVuFecz4RwSCvT12ZkaZQC0nN6He",
    });

    console.log(replicate, "rodando replicador");

    const output = (await replicate.run(
      "jagilley/controlnet-canny:aff48af9c68d162388d230a2ab003f68d2638d88307bdaf1c2f1ac95079c9613",
      {
        input: {
          image,
          scale: 7,
          prompt,
          image_resolution: "512",
          n_prompt:
            "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        },
      }
    )) as [string, string];

    await runMutation(internal.conectar.editar, {
      resultId,
      result: output[1],
    });
  }
);
