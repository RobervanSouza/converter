
import { mutation, query } from './_generated/server';

export const saveConvex =  mutation( 
    async ({db}, {prompt}: {prompt: string} ) => {
        console.log(prompt)

      await  db.insert("conectar", {
        prompt, 
        createdAt: Date.now(), 
      })
        return {
            message: "success",
        }
    }
);

export const getConvex = query(
    async ({db}) => {
        const result = await db.query("conectar").collect()

         return result;
    }
)