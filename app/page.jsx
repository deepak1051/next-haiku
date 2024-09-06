import Link from 'next/link';
import { register } from '../actions/userController';

export default function Page() {
  return (
    <>
      <p className="text-center text-3xl text-gray-600 mb-5">
        Don&rsquo;t have an account <strong>Create One</strong>
      </p>

      <form action={register} className="max-w-xs mx-auto">
        <div className="mb-3">
          <input
            name="username"
            autoComplete={false}
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="mb-3">
          <input
            name="password"
            autoComplete={false}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <button className="btn btn-primary">Create Account</button>
      </form>
    </>
  );
}
