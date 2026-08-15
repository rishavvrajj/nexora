import { auth } from "../../../../lib/auth";
import { headers } from "next/headers";
import EventDetailsContent from "@/components/EventDetailsContent";
import { redirect, notFound } from "next/navigation";
import { countByStatus } from "@/app/dashboard/page";

import prisma from "../../../../lib/prisma";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  console.log("eventId:", eventId);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth");
  }
  
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

  const row = await prisma.event.findFirst({
    where: {
      id: eventId,
      ownerUserId: session.user.id,
    },
    select: {
        id: true,
        ownerUserId: true,
        title: true,
        description: true,
        location: true,
        eventDate: true,
        createdAt: true,
        updatedAt: true,
        invite: {select: {token: true}},
        rsvps: {select: {status: true}}
    }
  });

  console.log("event from database:", row);

  if (!row) {
    notFound();
  }

  const count = countByStatus(row.rsvps);

  const event = {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    eventDate: row.eventDate ? row.eventDate.toISOString() : null,
    inviteToken: row.invite?.token ?? null,
    goingCount: count.goingCount,
    maybeCount: count.maybeCount,
    notGoingCount: count.notGoingCount,
  }

  console.log(count);
 
  return (
    <EventDetailsContent
      userId={session.user.id}
      eventId={row.id}
      event={event}
      rsvps={rsvps}
    />
  );
}