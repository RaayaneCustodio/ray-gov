import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { useRouter } from 'next/router';

const isPrivateRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/postagem(.*)"
]);

export default clerkMiddleware((auth, req) => {
    if (isPrivateRoute(req)){
        auth().protect()
    }
    
    
}) ;

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)'
  ],
};
