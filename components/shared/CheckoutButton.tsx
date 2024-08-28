"use client";

import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Checkout from "./Checkout";

function CheckoutButton({ event }: { event: IEvent }) {
  const hasEventFinished = new Date(event?.endDateTime) < new Date();
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  console.log(event);

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">Event has finished</p>
      ) : (
        <>
          <SignedOut>
            <Button asChild>
              <Link href={"/sign-in"}>Buy Ticket</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
}

export default CheckoutButton;
