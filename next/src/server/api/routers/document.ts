import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { uploadImage } from "../azure-helpers"

export const documentRouter = createTRPCRouter({
    upload: publicProcedure
        .input(z.object({ image: z.string(), imageName: z.string() }))
        .mutation(async ({ input }) => {
            console.log("image:", input.image)
            console.log("image name:", input.image)

            try {
                const imageLink = await uploadImage(input.image, input.imageName)
                console.log(imageLink)
            } catch (e) {
                console.error(e)
            }
        }),
})
