import { getAllUser } from "../../action";
import { Users, columns } from "./columns";
import { DataTable } from "./data-table";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default async function page() {
  const data = await getAllUser();
  return (
    <div className="flex-1 space-y-4 px-4 md:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-semibold">Events</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Events</h2>
        <p className="tracking-tight text-md text-muted-foreground">
          Manage events (Client side table functionalities.)
        </p>
      </div>
      <Separator />
      <div className="flex flex-col">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
