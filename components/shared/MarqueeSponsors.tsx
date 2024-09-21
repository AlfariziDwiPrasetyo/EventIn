"use client";

import { sponsors } from "@/lib/data";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const MarqueeSponsors = () => {
  return (
    <div className="flex flex-col mt-10">
      <div className="py-10">
        <h2 className="font-bold text-2xl text-center">Sponsored by</h2>
        <p className="text-center text-muted-foreground">(not actually)</p>
      </div>
      <Marquee gradient={true} autoFill={true}>
        <div className="flex justify-center min-width:max-content items-center">
          {sponsors.map((sponsor) => (
            <Image
              alt={sponsor.name}
              width={80}
              height={80}
              className="w-18 h-18 mx-5 md:mx-12 object-contain md:w-24 md:h-24"
              src={sponsor.url}
            />
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeSponsors;
