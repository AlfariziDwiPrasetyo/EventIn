import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import React from "react";

type updateEventProps = {
  params: {
    id: string;
  };
};

async function page({ params: { id } }: updateEventProps) {
  const { sessionClaims } = auth();
  const user = sessionClaims?.userId as string;

  const event = await getEventById(id);

  const isOrganizer = event.organizer._id == user;

  if (!isOrganizer) {
    redirect("/404");
  }

  return (
    <>
      <section className="py-5 md:py-7">
        <h3 className="wrapper h3-bold text-center sm:text-left">Edit Event</h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          userId={user}
          eventId={event._id}
          event={event}
          type="Edit"
        />
      </div>
    </>
  );
}

export default page;
