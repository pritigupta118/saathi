import { createTRPCRouter } from '../init';
import { massageRouter } from '@/modules/messages/server/procedures';
 
export const appRouter = createTRPCRouter({
  messages: massageRouter
})
 
// export type definition of API
export type AppRouter = typeof appRouter;