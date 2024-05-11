import { getUserRole } from "@/app/action";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const { data: role } = await supabase
    .from("roles")
    .select("role")
    .eq("id_user", user?.id);

  if (request.nextUrl.pathname.startsWith("/dashboard") && error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    role?.[0].role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/error", request.url));
  }
  // if (
  //   request.nextUrl.pathname.startsWith("/dashboard") &&
  //   role?.[0].role !== "admin"
  // ) {
  //   return NextResponse.redirect(new URL("/error", request.url));
  // }
  return response;
}
