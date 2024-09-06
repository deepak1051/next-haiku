import { ObjectId } from 'mongodb';
import HaikuForm from '../../../components/HaikuForm';
import { getCollection } from '../../../lib/db';
import { getUserFromCookie } from '../../../lib/getUser';
import {redirect} from 'next/navigation'

async function getDoc(id) {
  const haikusCollection = await getCollection('haikus');
  const result = await haikusCollection.findOne({
    _id: ObjectId.createFromHexString(id),
  });

  return result;
}

export default async function EditHaiku(props) {
  const doc = await getDoc(props.params.id);

  const user = await getUserFromCookie();

  if (user.userId !== doc.author.toString()) {
    return redirect('/');
  }

  return (
    <div>
      <h2 className="text-center text-3xl text-gray-600 mb-5">Edit Post</h2>

      <HaikuForm action="edit" haiku={doc} />
    </div>
  );
}
