import EventForm from "@/components/shared/EventForm";
import { useAuth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

function page() {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  console.log({ userId });
  return (
    <>
      <section className="py-5 md:py-7">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
}

export default page;
