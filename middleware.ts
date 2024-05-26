import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPrivateRoute = createRouteMatcher([
    "/dashboard(.*)"
])
 
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