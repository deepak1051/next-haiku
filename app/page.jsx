import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <h2 className="text-3xl text-blue-400">hello</h2>

      <Link href="/login" className="btn">
        login page
      </Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo architecto
        non ab omnis unde, quia ullam expedita, tempore explicabo esse qui dicta
        atque reprehenderit beatae earum nobis ratione, fugit blanditiis?{' '}
      </p>
    </div>
  );
}
