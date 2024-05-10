import CardItem from "@/components/CardItem";
import { assignDefaultRole } from "./action";

export default async function Home() {
  await assignDefaultRole();
  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <h1 className="font-bold text-3xl tracking-tight text-primary">
        EventIn.
      </h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
    </div>
  );
}
