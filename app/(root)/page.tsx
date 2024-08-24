import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import Link from "next/link";

export default async function Home() {
  const events = await getAllEvents({
    query: "",
    category: "",
    page: 1,
    limit: 6,
  });

  return (
    <>
      <section className="py-5 md:py-10 bg-primary-50">
        <div className="md:text-center flex flex-col md:items-center justify-center gap-8 px-5">
          <h1 className="h1-bold">Discover Events, Create Memories.</h1>
          <p className="p-regular-20 md:p-regular-24">
            From Planning to Attending, We’ve Got You Covered
          </p>
          <Button
            size="lg"
            asChild
            className=" flex items-center justify-center w-full sm:w-fit"
          >
            <Link href="#events">Book Now</Link>
          </Button>
        </div>
      </section>

      <Collection
        data={events?.data}
        emptyTitle="No Events Found"
        emptyStateSubtext="Comeback Later"
        collectionType="All_Events"
        limit={6}
        page={1}
        totalPages={2}
      />
      <div className="flex w-full flex-col gap-5 md:flex-row"></div>
    </>
  );
}
