import { reviews1 } from "@/lib/data";
import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

type MarqueeReviewsProps = {
  data: {
    name: string;
    img: string;
    review: string;
    email: string;
  }[];
  direction: "right" | "left" | "up" | "down" | undefined;
};

const MarqueeReviews = ({ data, direction }: MarqueeReviewsProps) => {
  return (
    <div className="width-[500px]">
      <Marquee
        gradient={true}
        autoFill={true}
        pauseOnHover={true}
        pauseOnClick={true}
        direction={direction}
      >
        {data.map((review, index) => (
          <div
            key={index}
            className="p-5 w-96 min-w-0 h-52 border-solid border-2 border-grey-100 rounded-md mx-3 hover:bg-gray-100"
          >
            <div className="flex py-2 gap-2 items-center">
              <Image
                src={review.img}
                width={32}
                className="rounded-full"
                height={32}
                alt="profilePic"
              />
              <h2 className="font-semibold">{review.name}</h2>
            </div>
            <p>{review.email}</p>
            <div className="mt-5">{review.review}</div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeReviews;
