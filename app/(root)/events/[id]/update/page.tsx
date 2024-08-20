import EventForm from "@/components/shared/EventForm";
import { useAuth } from "@clerk/nextjs";
import React from "react";

function page() {
  const { userId } = useAuth();

  return (
    <>
      <section className="py-5 md:py-7">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId as string} type="Create" />
      </div>
    </>
  );
}

export default page;
