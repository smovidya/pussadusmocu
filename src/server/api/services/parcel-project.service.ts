import { BORROWING_STATUS } from "@prisma/client";
import { type Ctx } from "../models/database.model";

/**
 * Retrieves all parcel projects for a given student or all if no student_id is provided.
 * @param {Ctx} ctx - The context containing the Prisma client instance.
 * @param {string | undefined} student_id - The ID of the student to filter by (optional).
 */
export const getAllParcelProject = async (ctx: Ctx, student_id: string | undefined) => {
  return await ctx.db.parcel_Project.findMany({
    where: student_id ? { student_id: student_id } : undefined,
    include: {
      project: true,
      parcel: true,
      student: true,
    },
  });
};

/**
 * Updates the status of borrowing parcels to "In Use" for a given student and project.
 * @param {Ctx} ctx - The context containing the Prisma client instance.
 * @param {string} student_id - The ID of the student.
 * @param {string} project_id - The ID of the project.
 */
export const updateStatusBorrowingToInUse = async (
  ctx: Ctx,
  student_id: string,
  project_id: string,
) => {
  return await ctx.db.$transaction(async (tx) => {
    await tx.parcel_Project.updateMany({
      where: {
        student_id: student_id,
        project_id: project_id,
        status: BORROWING_STATUS.BORROWING,
      },
      data: {
        status: BORROWING_STATUS.INUSE,
      },
    });
  });
};

/**
 * Updates the status of a parcel project from "Pending" to "Borrowing" with an admin description.
 * @param {Ctx} ctx - The context containing the Prisma client instance.
 * @param {string} parcel_project_id - The ID of the parcel project.
 * @param {string} description - The description provided by the admin.
 */
export const updateStatusPendingToBorrowing = async (
  ctx: Ctx,
  parcel_project_id: string,
  description: string,
) => {
  return await ctx.db.parcel_Project.update({
    where: {
      id: parcel_project_id,
    },
    data: {
      status: BORROWING_STATUS.BORROWING,
      description_admin: description,
    },
  });
};

/**
 * Rejects a booking request and returns the parcel to stock.
 * @param {Ctx} ctx - The context containing the Prisma client instance.
 * @param {string} parcel_project_id - The ID of the parcel project.
 * @param {string} description - The reason for rejection provided by the admin.
 */
export const rejectBooking = async (
  ctx: Ctx,
  parcel_project_id: string,
  description: string,
) => {
  return await ctx.db.$transaction(async (tx) => {
    const parcel = await tx.parcel_Project.findFirst({
      where: {
        id: parcel_project_id,
      },
      include: {
        parcel: true,
      },
    });

    // Update the status to REJECT and set the admin's description.
    await tx.parcel_Project.updateMany({
      where: {
        id: parcel_project_id,
      },
      data: {
        status: BORROWING_STATUS.REJECT,
        description_admin: description,
      },
    });

    // Update the stock of parcels by adding the amount from the rejected booking back to the stock.
    const current_amount = parcel?.parcel.amount ?? 0;
    const amount_from_booking = parcel?.amount ?? 0;
    const remain_parcel = current_amount + amount_from_booking;
    
    await tx.parcel.update({
      where: {
        parcel_id: parcel?.parcel_id,
      },
      data: {
        amount: remain_parcel,
      },
    });
  });
};

/**
 * Marks the parcel as returned and updates the parcel stock.
 * @param {Ctx} ctx - The context containing the Prisma client instance.
 * @param {string} parcel_project_id - The ID of the parcel project.
 * @param {number} parcel_return - The quantity of the parcel being returned.
 */
export const returnParcelToStock = async (
  ctx: Ctx,
  parcel_project_id: string,
  parcel_return: number,
) => {
  return await ctx.db.$transaction(async (tx) => {
    const parcel = await tx.parcel_Project.findFirst({
      where: {
        id: parcel_project_id,
      },
      include: {
        parcel: true,
      },
    });

    // Update the status to RETURN.
    await tx.parcel_Project.updateMany({
      where: {
        id: parcel_project_id,
      },
      data: {
        status: BORROWING_STATUS.RETURN,
      },
    });

    // Update the stock of parcels by adding the returned amount back to the stock.
    const current_amount = parcel?.parcel.amount ?? 0;
    const remain_parcel = current_amount + parcel_return;
    
    await tx.parcel.update({
      where: {
        parcel_id: parcel?.parcel_id,
      },
      data: {
        amount: remain_parcel,
      },
    });
  });
};

/**
 * Rejects a borrowing request and returns the parcel to stock.
 * @param {Ctx} ctx - The context containing the Prisma client instance.
 * @param {string} parcel_project_id - The ID of the parcel project.
 * @param {number} parcel_return - The quantity of the parcel being returned.
 */
export const rejectBorrowing = async (
  ctx: Ctx,
  parcel_project_id: string,
  parcel_return: number,
) => {
  return await ctx.db.$transaction(async (tx) => {
    const parcel = await tx.parcel_Project.findFirst({
      where: {
        id: parcel_project_id,
      },
      include: {
        parcel: true,
      },
    });

    // Update the status to REJECT.
    await tx.parcel_Project.updateMany({
      where: {
        id: parcel_project_id,
      },
      data: {
        status: BORROWING_STATUS.REJECT,
      },
    });

    // Update the stock of parcels by adding the returned amount back to the stock.
    const current_amount = parcel?.parcel.amount ?? 0;
    const remain_parcel = current_amount + parcel_return;
    
    await tx.parcel.update({
      where: {
        parcel_id: parcel?.parcel_id,
      },
      data: {
        amount: remain_parcel,
      },
    });
  });
};
