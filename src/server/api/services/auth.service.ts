import { type StudentDto } from "../models/auth.model";
import { type Ctx } from "../models/database.model";

/**
 * Retrieves a student record from the database based on the provided student ID.
 *
 * @param {Ctx} ctx - The context object containing the database client and other shared resources.
 * @param {StudentDto} student - The DTO containing the student ID to search for.
 *
 * @example
 * // Example usage:
 * const student = await getUser(ctx, { student_id: "12345" });
 * if (student) {
 *   console.log("Student found:", student);
 * } else {
 *   console.log("Student not found");
 * }
 */
export const getUser = async (ctx: Ctx, student: StudentDto) => {
  return await ctx.db.student.findFirst({
    where: {
      student_id: student.student_id,
    },
  });
};
