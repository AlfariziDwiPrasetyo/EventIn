import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

async function page() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventByUser({ userId, page: 1 });

  return (
    <>
      <section className="py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button className="hidden sm:flex" asChild>
            <Link href={"#events"}>Explore more events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        {/* <Collection
          data={events?.data}
          emptyTitle="No Event Ticket Purchased yet"
          emptyStateSubtext="No Worry Plenty Of Exciting Tickets"
          collectionType="All_Events"
          limit={3}
          urlParamName="ordersPage"
          page={1}
          totalPages={2}
        /> */}
      </section>

      <section className="py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button className="hidden sm:flex" asChild>
            <Link href={"/events/create"}>Create Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No Event Have Been Created yet"
          emptyStateSubtext="Go Create Event"
          collectionType="All_Events"
          limit={6}
          urlParamName="eventsPage"
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
}

export default page;
