/**
 * An arrays of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = [
  "/",
  "/configure/upload",
  "/configure/design",
  "/configure/preview",
];

export const adminRoutes: string[] = ["/dashboard"];

/**
 *An array of routes that are used for authentication
 * these routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = ["/auth/login", "/auth/register"];

/**
 *The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/";

/**
 * The default path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/";
