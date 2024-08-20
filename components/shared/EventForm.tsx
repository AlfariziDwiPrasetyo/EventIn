"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constant";
import Dropdown from "./Dropdown";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "./FileUploader";
import {
  Calendar,
  CircleDollarSign,
  LinkIcon,
  MapPin,
  Router,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/actions/event.actions";

interface EventFormProps {
  userId: string;
  type: "Create" | "Edit";
}

function EventForm({ userId, type }: EventFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues,
  });
  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    //   let uploadedImageUrl = "";

    //   if (files.length > 0) {
    //     const uploadedImages = await startUpload(files);

    //     if (!uploadedImages) {
    //       return;
    //     }

    //     uploadedImageUrl = uploadedImages[0].url;
    //   }

    //   if (type == "Create") {
    //     try {
    //       const newEvent = await createEvent({
    //         event: { ...values, imageUrl: uploadedImageUrl },
    //         userId,
    //         path: "/profile",
    //       });
    //       if (newEvent) {
    //         form.reset();
    //         router.push(`/event/${newEvent._id}`);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Title</FormLabel>
                <FormControl className="border-none focus:ring-offset-0 focus-visible:ring-transparent bg-grey-50">
                  <Input placeholder="Event Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl className="border-none focus:ring-offset-0 focus-visible:ring-transparent bg-grey-50">
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl className="h-64 border-none textarea">
                  <Textarea placeholder="Event Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>File Upload</FormLabel>
                <FormControl className="h-64">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <div className="bg-grey-50 flex-center px-4 ">
                    <MapPin size={16} />
                    <Input
                      className="input-field"
                      placeholder="Event Location"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <div className="bg-grey-50 overflow-hidden flex-center px-4 py-2">
                    <Calendar size={16} />
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDateTime"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <div className="bg-grey-50 overflow-hidden flex-center px-4 py-2">
                    <Calendar size={16} />
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="dd/MM/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="bg-grey-50 flex-center px-4">
                    <CircleDollarSign />
                    <Input
                      type="number"
                      className="input-field"
                      placeholder="Event Price"
                      {...field}
                    />
                    <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="items-center flex">
                              <label
                                htmlFor="isFree"
                                className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Is Free
                              </label>
                              <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree"
                                className="mr-2 h-5 w-5 border-2 border-primary"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <div className="bg-grey-50 flex-center px-4">
                    <LinkIcon size={16} />
                    <Input
                      className="input-field"
                      placeholder="Link Whatsapp / Zoom / Any Corelated Link With Event"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-[54] p-medium-16 p-4 col-span-2"
        >
          {form.formState.isSubmitting ? "Submitting" : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
}

export default EventForm;
