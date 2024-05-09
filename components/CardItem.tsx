import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { IoTicket } from "react-icons/io5";

function CardItem() {
  return (
    <Card>
      <CardHeader>
        <Image
          alt="image"
          src="https://plus.unsplash.com/premium_photo-1664361480105-33afc4559c40?q=80&w=1846&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="rounded-md w-92 h-52 object-cover"
          loading="lazy"
          height={180}
          width={300}
        />
      </CardHeader>
      <CardContent>
        <CardTitle>Live music NDX AKA</CardTitle>
        <p className="flex text-sm text-muted-foreground py-2">
          Jl. Haji Maskiro
        </p>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground justify-end">
        <IoTicket className="mr-2" />
        Free
      </CardFooter>
    </Card>
  );
}

export default CardItem;
