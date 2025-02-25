import NextAuth from "next-auth";
import { cookies } from "next/headers";
import { auth as session } from "@/auth";

import authConfig from "@/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  adminRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default auth(async (req) => {
  //     req.auth
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const user = await session();

  const cookieStore = await cookies();

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminPage = adminRoutes.includes(nextUrl.pathname);

  if (isAdminPage) {
    if (user?.user.role !== "ADMIN") {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      const configId = cookieStore.get("configurationId")?.value;

      if (configId) {
        cookieStore.delete("configurationId");

        return Response.redirect(
          new URL(`/configure/preview?id=${configId}`, nextUrl),
        );
      } else {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        // next url  bring absolute URL like localhost:3000/setting
      }
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
