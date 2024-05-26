import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Defina uma expressão regular para corresponder a rotas privadas
const privateRouteRegex = /^\/dashboard(\/.*)?$/;

export default clerkMiddleware((auth, req) => {
    // Verifique se a rota é privada
    if (privateRouteRegex.test(req.url)){
        // Proteja a rota
        auth().protect();
    }
});

export const config = {
    matcher: [
        '/((?!.*\\..*|_next).*)',
        '/',
        '/(api|trpc)(.*)'
    ],
};
