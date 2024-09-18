"use server";

import {
  CreateEventParams,
  GetAllEventsParams,
  GetEventsByUserParams,
  GetRelatedEventsByCategoryParams,
  UpdateEventParams,
} from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateEvent = async (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({
      path: "category",
      model: Category,
      select: "_id name",
    });
};

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();
    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Organizer not found ");
    }

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getEventById = async (eventId: string) => {
  try {
    await connectToDatabase();
    const event = await populateEvent(Event.findById(eventId));

    if (!event) {
      throw new Error("Event not found");
    }
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
};

export const getAllEvents = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllEventsParams) => {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};

    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;

    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const getEventByUser = async ({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) => {
  try {
    await connectToDatabase();

    const condition = {
      organizer: userId,
    };

    const skipAmount = (page - 1) * limit;

    const events = Event.find(condition)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const eventByUser = await populateEvent(events);
    const eventCount = await Event.countDocuments(condition);

    return {
      data: JSON.parse(JSON.stringify(eventByUser)),
      totalPages: Math.ceil(eventCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

export const deleteEventById = async ({
  eventId,
  path,
}: {
  eventId: string;
  path: string;
}) => {
  try {
    await connectToDatabase();

    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (deletedEvent) {
      revalidatePath(path);
    }
  } catch (error) {
    handleError(error);
  }
};

export const updateEventById = async ({
  event,
  userId,
  path,
}: UpdateEventParams) => {
  try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);

    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Event not found or Unauthorized user");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      {
        ...event,
        category: event.categoryId,
      },
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
};

export const getRelatedEvents = async ({
  categoryId,
  eventId,
  limit = 3,
  page = 1,
}: GetRelatedEventsByCategoryParams) => {
  try {
    await connectToDatabase();
    const skipAmount = (Number(page) - 1) * limit;
    const condition = {
      $and: [{ category: categoryId }, { _id: { $ne: eventId } }],
    };

    const events = Event.find(condition)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const relatedEvents = await populateEvent(events);

    const eventsCount = await Event.countDocuments(condition);

    return {
      data: JSON.parse(JSON.stringify(relatedEvents)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};
