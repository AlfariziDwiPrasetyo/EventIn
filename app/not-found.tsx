import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Custom404() {
  return (
    <>
      <Header />
      <section className="flex mt-12 justify-center">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <Image
              src="/assets/images/404.png"
              alt="404 icon"
              width={200}
              height={200}
              className=""
            />
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold text-blue-500">Oops!</h1>
            <p className="text-2xl p-3 font-medium text-grey-500/70">
              We couldn't find the page you are looking for
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
