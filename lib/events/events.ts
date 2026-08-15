'use server'

import { redirect } from "next/navigation";
import { auth } from "../auth"
import prisma from "../prisma";
import { headers } from "next/headers";
import { RsvpStatus } from "@/generated/prisma/enums";

const RSVP_STATUSES = ['going', 'maybe', 'not_going'] as const

function isRsvpStatus(s: string): s is RsvpStatus {
    return (RSVP_STATUSES as readonly string[]).includes(s);
}

function parseCreateEvent(formData: FormData) {
    const title = String(formData.get('title') ?? "").trim();

    if (title.length < 3 || title.length > 120) {
        throw new Error("Title must be between 3 and 120 characters.")
    }

    const description = String(formData.get("description") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const eventDate = String(formData.get("eventDate") ?? "").trim();

    return {
        title,
        description: description.length ? description.slice(0, 2000) : null,
        location: location.length ? location.slice(0, 200) : null,
        eventDate: eventDate.length ? eventDate : null,
    };
}

function parseRsvp(formData: FormData) {

    const name = String(formData.get("name") ?? "").trim();
    if (name.length < 2 || name.length > 120) {
        throw new Error("Name must be between 2 and 120 characters.");
    }

    const email = String(formData.get("email") ?? "").trim();
    if (email.length < 3 || email.length > 320 || !email.includes("@")) {
        throw new Error("Please enter a valid email.");
    }

    const status = String(formData.get("status") ?? "").trim();
    if (!isRsvpStatus(status)) {
        throw new Error("Invalid RSVP status.")
    }

    return { name, email, status };
}

export async function createEventAction(formData: FormData) {

    const requestheader = await headers()

    const session = await auth.api.getSession({
        headers: requestheader
    })

    const userId = session?.user.id

    const input = parseCreateEvent(formData);

    try {
        if (userId) {
            const createdEvent = await prisma.event.create({
                data: {
                    ownerUserId: userId,
                    title: input.title,
                    description: input.description,
                    location: input.location,
                    eventDate: input.eventDate ? new Date(input.eventDate) : null,
                }
            })

            console.log(createdEvent);
            redirect(`/events/${createdEvent.id}`)
        }
    } catch (e) {
        console.error(e);
    }
}

export async function createInviteLinkAction(eventId: string) {

    const requestheader = await headers()
    const session = await auth.api.getSession({
        headers: requestheader
    })

    const userId = session?.user.id

    const owns = await prisma.event.findUnique({
        where: { id: eventId, ownerUserId: userId },
        select: { id: true },
    })

    if (!owns) {
        throw new Error(`Event Not Found!!!`)
    }

    const token = crypto.randomUUID().replaceAll("-", "")
    console.log(token)

    const row = await prisma.eventInvite.upsert({
        where: { eventId },
        create: { eventId, token },
        update: { token },
    })
    console.log(row);
}

export async function submitOrUpdateRsvpAction(token: string, formData: FormData) {

    const input = parseRsvp(formData);

    const invite = await prisma.eventInvite.findUnique({
        where: { token },
        select: {
            id: true,
            event: {
                select: { id: true },
            }
        }
    })

    if (!invite) {
        throw new Error("Invite link is invalid !")
    }

    const eventId = invite.event.id;
    const emailNormalized = input.email.toLowerCase(); 

    const rsvp = await prisma.eventRsvp.upsert({
        where: { eventId_emailNormalized: {eventId, emailNormalized,},},
        create: {
            eventId,
            inviteId: invite.id,
            name: input.name,
            email: input.email,
            emailNormalized,
            status: input.status as RsvpStatus,
        },
        update: {
            name: input.name,
            status: input.status as RsvpStatus,
            respondedAt: new Date(),
        }
    })

    console.log(rsvp);

    redirect(`/invite/${token}?submitted=1`)
}