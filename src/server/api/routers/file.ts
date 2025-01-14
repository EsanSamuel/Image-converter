import { createTRPCRouter, publicProcedure } from "../trpc";

export const fileRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello, World!";
  }),
});
