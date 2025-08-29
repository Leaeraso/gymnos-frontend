import { NextResponse, type NextRequest } from 'next/server';
import appConfig from './config';

export const config = {
    matcher: ['/((?!_next|favicon.ico|login.webp).*)'],
}

export const middleware = (request: NextRequest) => {
    const authToken = request.cookies.get(appConfig.ACCESS_TOKEN_COOKIE_KEY)?.value;
    const isLoginPage = request.nextUrl.pathname === appConfig.PATH_LOGIN_PAGE;
    const isRegisterEntrancePage = request.nextUrl.pathname === appConfig.PATH_REGISTER_ENTRANCE_PAGE;

    if (isRegisterEntrancePage) {
        return NextResponse.next();
    }
    if (!authToken && !isLoginPage && !isRegisterEntrancePage) {
        return NextResponse.redirect(new URL(appConfig.PATH_LOGIN_PAGE, request.url));
    }

    NextResponse.redirect(new URL(appConfig.PATH_HOME_PAGE, request.url));
    return NextResponse.next();
}