import LogoutButton from "@/components/logoutButton";
import { validateRequest } from "@/lib/auth";

export default async function Home() {
  const { user } = await validateRequest();
  console.log(user);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LogoutButton />

    </main>
  );
}
