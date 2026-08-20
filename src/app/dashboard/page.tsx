import React from 'react'
import { auth } from '../../../lib/auth'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import type { RsvpStatus as prismaRsvpStatus } from '@/generated/prisma/enums';

import Dashboard from '@/components/Dashboard';
import prisma from '../../../lib/prisma';

export function countByStatus(rsvps: {status: prismaRsvpStatus}[]) {
  let goingCount = 0;
  let maybeCount = 0;
  let notGoingCount = 0;

  for (const r of rsvps) {
    if (r.status === "going") goingCount += 1;
    else if (r.status === "maybe") maybeCount += 1;
    else if (r.status === "not_going") notGoingCount += 1;
  }

  return { goingCount, maybeCount, notGoingCount };
}

export default async function page() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  const userId = session?.user.id;

  const rows = await prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      rsvps: { select: { status: true } }
    }
  })

  const events = rows.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    location: e.location,
    eventDate: e.eventDate,
    ...countByStatus(e.rsvps)
  }))

  console.log(session)
  console.log(rows)

  if (!session || !session.user) {
    redirect('/auth')
  };

  return (
    <div className='flex items-center justify-center min-h-screen min-w-screen bg-black'>
      <Dashboard userId={session.user.id} events={events} />
    </div>
  )
}