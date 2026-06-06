import { projectRouter } from '@/modules/projects/server/procedures';
import { createTRPCRouter } from '../init';
import { massageRouter } from '@/modules/messages/server/procedures';
 
export const appRouter = createTRPCRouter({
  messages: massageRouter,
  projects: projectRouter
})
 
// export type definition of API
export type AppRouter = typeof appRouter;