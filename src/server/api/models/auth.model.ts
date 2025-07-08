import { z } from "zod";

// Define the schema
export const StudentDtoSchema = z.object({
  student_id: z.string(),
});

export const StudentDepartmentEnum = z.enum([
  "SMO",
  "MATHCOM",
  "MARINE",
  "CHEM",
  "CHEMTECH",
  "BIO",
  "BIOCHEM",
  "BSAC",
  "BBTECH",
  "FOODTECH",
  "MATSCI",
  "PHYSICS",
  "BOTGEN",
  "MICROBIO",
  "PHOTO",
  "GEO",
  "ENVI",
  "NISIT_OFFICER",
]);

export const StudentSchema = z.object({
  student_id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  department: StudentDepartmentEnum,
  isAdmin: z.boolean().optional(),
  line_id: z.string().optional(),
});

// Infer the TypeScript type from the schema
export type StudentDto = z.infer<typeof StudentDtoSchema>;
