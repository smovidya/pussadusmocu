import { z } from "zod";

// Define the schema
export const StudentDtoSchema = z.object({
  student_id: z.string(),
});

// Infer the TypeScript type from the schema
export type StudentDto = z.infer<typeof StudentDtoSchema>;
