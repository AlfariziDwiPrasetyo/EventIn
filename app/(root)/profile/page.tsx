import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.action";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

async function page({ searchParams }: SearchParamProps) {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const eventsPage = Number(searchParams?.eventsPage) || 1;
  const ordersPage = Number(searchParams?.ordersPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventByUser({
    userId,
    page: eventsPage,
    limit: 3,
  });

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
        <Collection
          data={orderedEvents}
          emptyTitle="No Event Ticket Purchased yet"
          emptyStateSubtext="No Worry Plenty Of Exciting Tickets"
          collectionType="My_Tickets"
          limit={3}
          urlParamName="ordersPage"
          page={ordersPage}
          totalPages={orderedEvents.totalPages}
        />
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
          collectionType="Events_Organized"
          limit={3}
          urlParamName="eventsPage"
          page={eventsPage}
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </>
  );
}

export default page;
