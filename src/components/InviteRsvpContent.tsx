import React from 'react'
import prisma from '../../lib/prisma'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from './UI/card'
import { Badge } from './UI/badge'
import { Field, FieldLabel } from './UI/field'
import { Button } from './UI/button'
import { submitOrUpdateRsvpAction } from '../../lib/events/events'

export default async function InviteRsvpContent({
    token,
    session,
    submitted,
} : {
    token: string
    session: object
    submitted: boolean
}) {

    const rows = await prisma.eventInvite.findUnique({
        where: { token: token },
        include: {
            event: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    location: true,
                    eventDate: true,
                }
            }
        }
    });

    if (!rows) {
        notFound();
    }

    const e = rows.event;

    const event = {
        title: e.title,
        description: e.description,
        location: e.location,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null,
    }

    const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token);
 
  return (
    <div className='max-auto w-full max-w-2xl'>
        <Card>
            <CardHeader className='space-y-3'>
                <Badge variant='secondary' className='w-fit'>
                    RSVP
                </Badge>
                <CardTitle>{event.title}</CardTitle>
                <p className='text-sm text-black'>
                    {event.eventDate ? new Date(event.eventDate).toLocaleString() : "No Date Selected !"}
                    {"  |  "}
                    {event.location ? ` - ${event.location}` : "No Location Selected !"}
                </p>
                <p className='text-sm text-black'>
                    {event.description}
                </p>
            </CardHeader>
            <CardContent>
                {submitted ? (
                    <p className='mb-4 p-2 rounded-md border border-gray-900'>
                        Thanks. Your RSVP has been recorded (or uploaded)
                    </p>
                ) : (
                    null
                )}
                <form action={submitRsvpForToken} className='space-y-2'>
                    <Field>
                        <FieldLabel>Name</FieldLabel>
                        <input id='name' name='name' className='border border-black rounded-md p-1 px-2' placeholder='Your Name' type="text" required/>
                    </Field>
                    <Field>
                        <FieldLabel>Email</FieldLabel>
                        <input id='email' name='email' className='border border-black rounded-md p-1 px-2' placeholder='Your Email' type="email" required/>
                    </Field>
                    <Field>
                        <FieldLabel>Attendance</FieldLabel>
                        <select name="status" id="status" className='border border-black rounded-md p-1 px-2' required defaultValue={'going'}>
                            <option value="going">Going</option>
                            <option value="maybe">Maybe</option>
                            <option value="not_going">Not Going</option>
                        </select>
                    </Field>
                    <Button type="submit" className='cursor-pointer'>Submit RSVP</Button>
                </form>
            </CardContent>
        </Card>
    </div>
  )
}
