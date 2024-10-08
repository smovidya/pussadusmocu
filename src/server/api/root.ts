import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth.router";
import { parcelRouter } from "./routers/parcel.router";
import { projectRouter } from "./routers/project.router";
import { Parcel_projectRouter } from "./routers/parcel_Project.router";
import { calendarRouter } from "./routers/calendar.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  parcel: parcelRouter,
  project: projectRouter,
  parcel_Project: Parcel_projectRouter,
  calendar: calendarRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
