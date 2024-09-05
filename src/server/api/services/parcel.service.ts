import { BORROWING_STATUS, PARCEL_TYPE } from "@prisma/client";
import { type Ctx } from "../models/database.model";
import { type ParcelDto, type BookingDto } from "../models/parcel.model";
import { sendLineNotificaion } from "~/lib/function";

/**
 * Books a parcel for a student project.
 *
 * @param {Ctx} ctx - The Prisma context object.
 * @param {BookingDto} booking_data - The booking details including student, project, and parcel information.
 * @throws {Error} If the requested amount exceeds available amount.
 */
export const bookingParcel = async (ctx: Ctx, booking_data: BookingDto) => {
  return await ctx.db.$transaction(async (tx) => {
    const parcel = await tx.parcel.findFirst({
      where: {
        parcel_id: booking_data.parcel_id,
      },
    });

    const parcel_amount = parcel?.amount ?? 0;

    if (booking_data.amount > parcel_amount) {
      throw new Error("Requested amount exceeds available amount");
    }

    await tx.parcel_Project.create({
      data: {
        student_id: booking_data.student_id,
        parcel_id: booking_data.parcel_id,
        project_id: booking_data.project_id,
        amount: booking_data.amount,
        description: booking_data.description,
        startDate: booking_data.start_date,
        endDate: booking_data.end_date,
        status: BORROWING_STATUS.PENDING,
      },
    });

    await tx.parcel.update({
      where: {
        parcel_id: booking_data.parcel_id,
      },
      data: {
        amount: parcel_amount - booking_data.amount,
      },
    });

    const student = await tx.student.findFirst({
      where: { student_id: booking_data.student_id },
    });
    if (booking_data.project_id === "0000000000") {
      await sendLineNotificaion(
        student?.name ?? "",
        booking_data.start_date?.toDateString() ?? "",
      );
    }
  });
};

/**
 * Deletes a parcel if it's not in use.
 *
 * @param {Ctx} ctx - The Prisma context object.
 * @param {string} parcel_id - The ID of the parcel to delete.
 */
export const deleteParcel = async (ctx: Ctx, parcel_id: string) => {
  return ctx.db.$transaction(async (tx) => {
    await tx.parcel_Project.deleteMany({
      where: {
        parcel_id: parcel_id,
        NOT: {
          status: BORROWING_STATUS.INUSE,
        },
      },
    });
    await tx.parcel.delete({
      where: {
        parcel_id: parcel_id,
      },
    });
  });
};

/**
 * Creates a new parcel in the system.
 *
 * @param {Ctx} ctx - The Prisma context object.
 * @param {ParcelDto} parcel - The details of the parcel to create.
 */
export const createParcel = async (ctx: Ctx, parcel: ParcelDto) => {
  return await ctx.db.parcel.create({
    data: {
      title: parcel.name,
      amount: parcel.amount,
      available: parcel.available,
      department: parcel.department,
      description: parcel.description,
      group: parcel.group,
      type: parcel.type,
      unit: parcel.unit,
      image_url: parcel.image_url,
      parcel_id: parcel.id,
    },
  });
};

/**
 * Edits an existing parcel's details.
 *
 * @param {Ctx} ctx - The Prisma context object.
 * @param {ParcelDto} parcel - The details of the parcel to update.
 */
export const editParcel = async (ctx: Ctx, parcel: ParcelDto) => {
  return await ctx.db.parcel.update({
    where: {
      parcel_id: parcel.id,
    },
    data: {
      title: parcel.name,
      amount: parcel.amount,
      available: parcel.available,
      department: parcel.department,
      description: parcel.description,
      group: parcel.group,
      type: parcel.type,
      unit: parcel.unit,
      image_url: parcel.image_url,
      parcel_id: parcel.id,
    },
  });
};

/**
 * Retrieves all parcels from the database.
 *
 * @param {Ctx} ctx - The Prisma context object.
 */
export const getAllParcel = async (ctx: Ctx) => {
  return await ctx.db.parcel.findMany();
};

/**
 * Retrieves a specific parcel by its ID.
 *
 * @param {Ctx} ctx - The Prisma context object.
 * @param {string} parcel_id - The ID of the parcel to retrieve.
 */
export const getParcelById = async (ctx: Ctx, parcel_id: string) => {
  return await ctx.db.parcel.findFirst({
    where: {
      parcel_id: parcel_id,
    },
  });
};

/**
 * Retrieves available parcels for a student based on the project ID.
 *
 * @param {Ctx} ctx - The Prisma context object.
 * @param {string} project_id - The ID of the project.
 * @param {string} student_id - The ID of the student.
 */
export const getParcelReaminByStudentId = async (
  ctx: Ctx,
  project_id: string,
  student_id: string,
) => {
  const key_project = "0000000000";

  const is_student_in_key_project = await ctx.db.project_Student.findFirst({
    where: {
      project_id: key_project,
      student_id: student_id,
    },
  });

  const is_student_admin = await ctx.db.student.findFirst({
    where: {
      student_id: student_id,
      isAdmin: true,
    },
  });

  return await ctx.db.parcel.findMany({
    where:
      is_student_in_key_project && project_id === key_project
        ? { available: true, type: PARCEL_TYPE.KEY }
        : is_student_admin && project_id === key_project
          ? { available: true, type: PARCEL_TYPE.KEY }
          : {
              available: true,
              NOT: {
                type: PARCEL_TYPE.KEY,
              },
            },
  });
};
