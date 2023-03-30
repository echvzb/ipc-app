import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const usersRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ ctx }) => {
    return prisma.user.findMany({
      where: {
        id: {
          not: ctx.session.user.id,
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
        canSeeGraph: true,
      },
    });
  }),
  patchUserCanSeeGraph: protectedProcedure
    .input(z.object({ userId: z.string(), canSeeGraph: z.boolean() }))
    .mutation(async ({ input }) => {
      await prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          canSeeGraph: input.canSeeGraph,
        },
      });
    }),
});
