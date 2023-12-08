import LoginForm from "@/components/LoginForm"; /*composant*/
import { getServerSession } from "next-auth";   
import { redirect } from "next/navigation"; /*navigation entre les page*/
import { authOptions } from "./api/auth/[...nextauth]/route"; 

export default async function Home() {
  const session = await getServerSession(authOptions); 

  if (session) redirect("/dashboard");

  return (
    <main>
      <LoginForm />
    </main>
  );
}
