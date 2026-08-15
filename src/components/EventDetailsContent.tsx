'use client'

import Link from 'next/link'
import { Button } from './UI/button'
import { Badge } from './UI/badge'

type Event = {
  id: string
  title: string
  description: string | null
  location: string | null
  eventDate: string | Date | null
  inviteToken: string | null
  goingCount: number
  maybeCount: number
  notGoingCount: number
}

import { Card, CardHeader, CardContent, CardTitle } from './UI/card'
import { createInviteLinkAction } from '../../lib/events/events'
import prisma from '../../lib/prisma'
// import { Form } from 'react-hook-form'

export default async function EventDetailsContent({
  userId,
  eventId,
  event,
}: {
  userId: string
  eventId: string
  event: Event
}) {
  console.log('userId', userId)
  console.log('eventId', eventId)

  const rsvpRows = await prisma.eventRsvp.findMany({
    where: { eventId },
    orderBy: { respondedAt: 'desc'},
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      respondedAt: true
    },
  });

  const rsvps = rsvpRows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    status: r.status,
    respondedAt: r.respondedAt.toISOString()
  }))

  const CreateInvite = createInviteLinkAction.bind(null, event.id)
  const inviteURL = event.inviteToken ? `${process.env.NEXT_PUBLIC_APP_URL ?? ""}invite/${event.inviteToken}` : ""
 
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Event details</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
              {event.title}
            </h1>
          </div>

          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
            Event
          </span>
        </div>

        <div className="space-y-5">
          <div>
            <h2 className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-400">
              Description
            </h2>
            <p className="leading-7 text-slate-200 overflow-hidden h-fit">
              {event.description || 'No description available.'}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-800/70 p-4">
              <p className="text-sm text-slate-400">Date</p>
              <p className="mt-1 font-medium text-white">
                {event.eventDate
                  ? new Date(event.eventDate).toLocaleDateString()
                  : 'No date selected'}
              </p>
            </div>

            <div className="rounded-xl bg-slate-800/70 p-4">
              <p className="text-sm text-slate-400">Location</p>
              <p className="mt-1 font-medium text-white">
                {event.location || 'No location selected'}
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-slate-400">
              Responses
            </h2>
          </div>
        </div>

        <Badge className=''>Going: {event.goingCount}</Badge>
        <Badge>Maybe: {event.maybeCount}</Badge>
        <Badge>Not Going: {event.notGoingCount}</Badge>

        <Card>
            <CardHeader>Invite Link</CardHeader>
            <CardContent className='space-y-3'>
                <p>Share Your link with guest so they can RSVP without creating an account.</p>
                {inviteURL ? (<div><Link href={inviteURL} target='_blank'>{inviteURL}</Link></div>) : (<p>No Invite Link Generated!!</p>) }
                <form action={CreateInvite}>
                    <Button>Generate Link</Button>
                </form>
            </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attendees</CardTitle>
          </CardHeader>
          <CardContent>
            {rsvps.length === 0 ? (
              <p>No responses yet!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700 text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-slate-300">Name</th>
                      <th className="px-4 py-2 text-left font-medium text-slate-300">Email</th>
                      <th className="px-4 py-2 text-left font-medium text-slate-300">Status</th>
                      <th className="px-4 py-2 text-left font-medium text-slate-300">Responded</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {rsvps.map((rsvp) => (
                      <tr key={rsvp.id}>
                        <td className="px-4 py-3 text-slate-200">{rsvp.name}</td>
                        <td className="px-4 py-3 text-slate-200">{rsvp.email}</td>
                        <td className="px-4 py-3 text-slate-200">{rsvp.status}</td>
                        <td className="px-4 py-3 text-slate-200">{new Date(rsvp.respondedAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 border-t border-slate-800 pt-6">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}