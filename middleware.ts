import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const result = await fetch("http://localhost:3000/api/user", {
    headers: {
      Cookie: request.cookies.toString(),
    },
  });
  const session = await result.json();

  const url = request.nextUrl.pathname;
  const protectedPages = ["/home", "/createPost", "/profile", "/explore"];

  if (!session) {
    // User is not logged in
    if (protectedPages.some((page) => url.includes(page))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    // User is logged in
    if (url.startsWith("/register")) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    if (session.user.onboardingCompleted === false) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
    if (
      protectedPages.some((page) => url.includes(page)) &&
      !session.user.onboardingCompleted
    ) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
    if (url.startsWith("/onboarding") && session.user.onboardingCompleted) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|assets|favicon.ico).*)",
};
