import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getEventById } from "@/lib/actions/event.actions";
import { formatDateTime, formatPrice } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import { Calendar, CalendarX, LinkIcon, MapPin, User } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = async ({ params: { id } }: SearchParamProps) => {
  const event = await getEventById(id);
  console.log(event);
  return (
    <section className="flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full 2xl:max-w-7xl">
        <div className="flex-center p-5">
          <Image
            src={event.imageUrl}
            alt="Banner Image"
            width={1000}
            height={800}
            className=" min-h-[300px] h-full object-cover object-center rounded-md"
          />
        </div>

        <div className="flex flex-col w-full gap-3 p-5 md:p-10 ">
          <div className="flex flex-col gap-3">
            <h2 className="h2-bold">{event.title}</h2>
            <div className="flex gap-2 ">
              <p className="p-2 text-sm text-blue-700 font-semibold bg-blue-500/10 rounded-md">
                {event.category.name}
              </p>
              {event.isFree ? (
                <p className="p-2 text-green-700 text-sm font-semibold bg-green-500/10 rounded-md">
                  Free
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center text-sm">
              <Calendar strokeWidth={2.5} size={16} />
              <p className="px-4">
                <span className="font-semibold">Start : </span>
                <span>
                  {formatDateTime(event.startDateTime).dateOnly} -
                  {formatDateTime(event.startDateTime).timeOnly}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap items-center text-sm">
              <CalendarX strokeWidth={2.5} size={16} />
              <p className="px-4">
                <span className="font-semibold">End : </span>
                <span>
                  {formatDateTime(event.endDateTime).dateOnly} -
                  {formatDateTime(event.endDateTime).timeOnly}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap items-center text-sm">
              <MapPin strokeWidth={2.5} size={16} />
              <p className="px-4">
                <span className="font-semibold">Location : </span>
                {event.location}
              </p>
            </div>
            <div className="flex flex-wrap items-center text-sm">
              <User strokeWidth={2.5} size={16} />
              <p className="px-4">
                <span className="font-semibold">By : </span>
                <span className="font-bold text-primary">
                  {event.organizer.firstName}{" "}
                  {event.organizer.lastName ? event.organizer.lastName : ""}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-5">
            <p className="p-bold-20 flex px-5 justify-end">
              {event.isFree ? (
                <span className=" text-green-700">FREE</span>
              ) : (
                formatPrice(event.price)
              )}
            </p>
            <Button>Buy</Button>
          </div>
          <Separator />

          <div className="flex flex-col gap-2">
            <p className=" font-bold ">Description</p>
            <p className="">{event.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
