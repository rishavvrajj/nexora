import InviteRsvpContent from "@/components/InviteRsvpContent";
import { auth } from "../../../../lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function invitePage({
  params,
  searchParams
} : {
  params: Promise<{ token: string }>
  searchParams: Promise<{ submitted?: string }>
}) {

  const { token } = await params;
  const query = await searchParams;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  if (!session) {
    redirect('/auth')
  };

  return (
    <InviteRsvpContent 
      token={token} 
      session={session} 
      submitted={query.submitted === "1"} 
    />
  )
}