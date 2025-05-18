import { removeAuthToken, verifyAuthToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  if (!await verifyAuthToken()) {
    await removeAuthToken();
    redirect('/login');
  }

  return (
    <div>
      <h1 className="text-3xl font-bold w-full flex justify-center items-center mt-7">
        Gymnos
      </h1>
    </div>
  );
}
