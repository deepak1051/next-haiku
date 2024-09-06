import Dashboard from '../components/Dashboard';
import RegisterForm from '../components/RegisterForm';
import { getUserFromCookie } from '../lib/getUser';

export default async function Page() {
  const user = await getUserFromCookie();
  return (
    <>
      {user ? (
        <Dashboard user={user} />
      ) : (
        <>
          <p className="text-center text-3xl text-gray-600 mb-5">
            Don&rsquo;t have an account <strong>Create One</strong>
          </p>

          <RegisterForm />
        </>
      )}
    </>
  );
}
