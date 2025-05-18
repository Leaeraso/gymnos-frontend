import { verifyAuthToken, removeAuthToken } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function WelcomePage() {
  const isValidToken = await verifyAuthToken();
  console.log(isValidToken);
  if (!await verifyAuthToken()) {
    await removeAuthToken();
    redirect('/login');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold w-full flex justify-center items-center mt-7">
        Welcome to Gymnos
      </h1>
    </div>
  );
}
