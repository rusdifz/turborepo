import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/config/firebase";

const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = await auth.currentUser;

  // if (!session && protectedRoutes.some((route) => path.startsWith(route))) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}
