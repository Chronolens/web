import { auth } from "@/auth";

const unprotectedPaths = ["/login", "/signup"];

export default auth((req) => {
  if (!req.auth && !unprotectedPaths.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
 matcher: ['/((?!api|_next/static|_next/image|favicon.ico|static/).*)'],
};
