import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
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

      <div className="flex w-full flex-col gap-5 md:flex-row"></div>
    </>
  );
}
