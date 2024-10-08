import Link from 'next/link';
import { getUserFromCookie } from '../lib/getUser';
import { logout } from '../actions/userController';

export default async function Header() {
  const user = await getUserFromCookie();

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="container mx-auto">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              HaikuApp
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              {user ? (
                <>
                  <li className="mr-2">
                    <Link href="/create-haiku" className="btn btn-secondary">
                      Create Haiku
                    </Link>
                  </li>
                  <li>
                    <form action={logout} className="btn btn-neutral">
                      <button>Logout</button>
                    </form>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login">Log In</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
