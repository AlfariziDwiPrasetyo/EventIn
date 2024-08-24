import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime, formatPrice } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { MapPin } from "lucide-react";

type CardProps = {
  event: IEvent;
  hasOrderLink: boolean;
  hidePrice: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  return (
    <div className="group relative flex w-full sm:max-w-lg flex-col overflow-hidden rounded-sm bg-white shadow-md transition-all hover:shadow-lg min-h-[329px]">
      <Link href={`/events/${event._id}`}>
        <Image
          alt="Event Banner"
          src={event.imageUrl}
          width={1000}
          height={1000}
          className="max-h-[200px] object-cover"
        />
      </Link>

      <div className="flex flex-col gap-3 px-5 py-2 md:gap-4">
        {!hidePrice && (
          <div className="flex gap-2">
            {event.isFree ? (
              <span className="p-1 text-green-700 text-xs font-semibold bg-green-500/10 rounded-md">
                Free
              </span>
            ) : null}

            <p className="text-xs font-semibold rounded-md bg-blue-500/10 px-4 py-1 text-blue-500 line-clamp-1">
              {event?.category?.name}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Link href={`/events/${event._id}`}>
            <p className="text-2xl font-semibold line-clamp-2 flex-1 text-black">
              {event.title}
            </p>
          </Link>
          <p className="text-xs font-semibold text-muted-foreground">
            {formatDateTime(event.startDateTime).dateTime}
          </p>
          <div className="flex flex-wrap items-center text-sm">
            <MapPin strokeWidth={1} size={12} />
            <p className="text-xs text-muted-foreground justify-end ml-2">
              {event.location}
            </p>
          </div>
        </div>

        <Separator />

        <div className="flex justify-end py-3">
          {event.isFree ? (
            <p className="font-semibold text-primary text-xl">FREE</p>
          ) : (
            <p className="font-semibold text-primary text-xl">
              {formatPrice(event.price as string)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
