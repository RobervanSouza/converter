import {
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { api, internal } from "./_generated/api";
import Replicate from "replicate";
import { Id } from "./_generated/dataModel";


export const saveConvex = mutation(
  async (
    { db, scheduler },
    { prompt, image }: { prompt: string; image: string }
  ) => {
    console.log(prompt);

    const resultId = await db.insert("conectar", {
      prompt,
      createdAt: Date.now(),
    });

    await scheduler.runAfter(0, internal.gerador.generate, {
      resultId: resultId,
      prompt,
      image,
    });
    return {
      message: "success",
    };
  }
);



export const editar = internalMutation(
  async (
    { db },
    { resultId, result }: { resultId: Id<"conectar">; result: string }
  ) => {
    await db.patch(resultId, {
      result,
    });
  }
);

export const getSketch = query(
  ({ db }, { sketchId }: { sketchId: Id<"conectar"> }) => {
    if (!sketchId) return null;
    return db.get(sketchId);
  }
);
export const getConvex = query(async ({ db }) => {
  const result = await db.query("conectar").collect();

  return result;
});
