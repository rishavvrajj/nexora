import React from 'react'
import { auth } from '../../../lib/auth'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { signOut } from '../../../lib/auth-client';

import UserCard from '@/components/UI/UserCard';

export default async function page() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  console.log(session)

  if (!session || !session.user) {
    redirect('/auth')
  };

  return (
    <div className='flex items-center justify-center min-h-screen min-w-screen'>
      <UserCard session={session}/>
    </div>
  )
}