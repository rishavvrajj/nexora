import React from 'react'
import Login from '@/components/Login'
import { headers } from 'next/headers';
import { auth } from '../../../lib/auth';
import { redirect } from 'next/navigation';

export default async function AuthPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className=''>
      <Login />
    </div>
  )
}