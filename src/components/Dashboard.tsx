'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Badge } from "./UI/badge"
import { createEventAction } from '../../lib/events/events'

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from './UI/card'

import {
  Field,
  FieldLabel,
  FieldDescription,
} from './UI/field'

import { Textarea } from './UI/textarea'
import { Button } from './UI/button'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from './UI/avatar'

type Section = 'create' | 'view' | 'profile'

type Event = {
  id: string
  title: string
  description: string | null
  location: string | null
  eventDate: string | Date | null
  goingCount: number
  maybeCount: number
  notGoingCount: number
}

export default function Dashboard({
  userId,
  events,
}: {
  userId: string
  events: Event[]
}) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState<Section>('view')

  return (
    <div className="min-h-screen w-full overflow-hidden bg-zinc-900 text-white">
      {/* Navbar */}
      <header className="flex h-14 items-center justify-between border-b border-white/20 px-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="cursor-pointer text-sm hover:underline"
        >
          Home
        </button>

        <nav className="flex gap-6 text-sm">
          <button
            onClick={() => setActiveSection('create')}
            className="cursor-pointer hover:underline"
          >
            Create event
          </button>
          <button
            onClick={() => setActiveSection('view')}
            className="cursor-pointer hover:underline"
          >
            View events
          </button>
          <button
            onClick={() => setActiveSection('profile')}
            className="cursor-pointer hover:underline"
          >
            Profile
          </button>
        </nav>

        <button
          onClick={() => router.push('/')}
          className="flex h-6 w-6 items-center justify-center rounded-sm bg-white/10 hover:bg-red-700"
          aria-label="Close"
        >
          ✕
        </button>
      </header>

      {/* Main content */}
      <main className="relative flex h-[calc(100vh-3.5rem)] items-center justify-center bg-blue-900 p-6">
        {/* Create Event Overlay */}
        {activeSection === 'create' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
            <Card className="w-full max-w-md bg-black text-white">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Create event</CardTitle>
                <button
                  onClick={() => setActiveSection('view')}
                  className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-red-700"
                  aria-label="Close create form"
                >
                  ✕
                </button>
              </CardHeader>

              <CardContent>
                <form
                  action={async (formData) => {
                    await createEventAction(formData)
                    setActiveSection('view')
                  }}
                  className="space-y-4"
                >
                  <Field>
                    <FieldLabel htmlFor="title">Title</FieldLabel>
                    <input
                      id="title"
                      name="title"
                      required
                      placeholder="Team dinner..."
                      className="w-full rounded-sm border border-white/30 bg-zinc-800 px-3 py-2 text-sm outline-none focus:border-white"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Optional details about the event."
                      className="w-full rounded-sm border border-white/30 bg-zinc-800 px-3 py-2 text-sm outline-none focus:border-white"
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="eventDate">Date and time</FieldLabel>
                    <input
                      id="eventDate"
                      name="eventDate"
                      type="datetime-local"
                      className="w-full rounded-sm border border-white/30 bg-zinc-800 px-3 py-2 text-sm text-white outline-none focus:border-white"
                    />
                    <FieldDescription className="text-xs text-white/60">
                      Optional. You can set this later.
                    </FieldDescription>
                  </Field>

                  <div className="flex gap-3 pt-2">
                    <Button type="submit" className="cursor-pointer">
                      Create event
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setActiveSection('view')}
                      className="cursor-pointer"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View Events */}
        {activeSection === 'view' && (
          <div className="w-full max-w-5xl">
            <h2 className="mb-4 text-2xl font-semibold">Your events</h2>

            {events.length === 0 ? (
              <p className="text-white/70">No events found.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <Card key={event.id} className="bg-black/60 text-white">
                    
                    <CardHeader className='flex justify-between items-center'>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Button onClick={() => router.push(`/event/${event.id}`)}>RSVP</Button>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      {event.description && (
                        <p className="text-sm text-white/80">{event.description}</p>
                      )}

                      <div className="flex space-x-5">
                        <div className='flex -space-x-3'>
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </div>
                        <Badge>Going: {event.goingCount}</Badge>
                        <Badge>Maybe: {event.maybeCount}</Badge>
                        <Badge>Not Going: {event.notGoingCount}</Badge>
                      </div>

                      <p className="text-xs text-white/70">
                        {event.eventDate
                          ? new Date(event.eventDate).toLocaleString()
                          : 'No date'}{' '}
                        {event.location ? `• ${event.location}` : '• Location not set'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Overlay */}
        {activeSection === 'profile' && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-lg bg-black p-6 text-white">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold">Profile</h3>
                <button
                  onClick={() => setActiveSection('view')}
                  className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-red-700"
                  aria-label="Close profile"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-white/70">User ID</p>
              <p className="mt-1 break-all font-mono text-sm">{userId}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}