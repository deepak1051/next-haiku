import { redirect } from 'next/navigation';
import HaikuForm from '../../components/HaikuForm';
import { getUserFromCookie } from '../../lib/getUser';

export default async function CreateHaiku() {
  const user = await getUserFromCookie();

  if (!user) {
    redirect('/');
  }

  return (
    <>
      <h2 className="text-center text-2xl text-gray-600 mb-4">Create Haiku</h2>

      <HaikuForm action="create" />
    </>
  );
}
