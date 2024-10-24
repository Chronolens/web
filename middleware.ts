// export { auth as middleware} from "@/auth";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const unprotectedPaths = ["/signin", "/signup"];
export default auth((req) => {
  if (req.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  if (!req.auth && !unprotectedPaths.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/signin", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
