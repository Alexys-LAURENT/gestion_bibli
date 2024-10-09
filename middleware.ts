import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req) {
		const loggedUser = req.nextauth.token;
    

		if (!loggedUser && (req.nextUrl.pathname === '/my-books-rentals' || req.nextUrl.pathname === '/settings')) {
			return NextResponse.redirect(new URL('/login', req.url));
		}

    if (loggedUser && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
			return NextResponse.redirect(new URL('/home', req.url));
		}

		if (!loggedUser?.is_admin && (req.nextUrl.pathname.startsWith('/admin'))) {
			return NextResponse.redirect(new URL('/home', req.url));
		}

	},
	{
		// make the middleware function trigger on every request
		callbacks: {
			authorized: () => true,
		},
	}
);

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
