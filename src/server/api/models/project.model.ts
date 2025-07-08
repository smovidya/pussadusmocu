import { z } from "zod";

export const ProjectOwnerEnumSchema = z.enum([
  "PRESSIDENT",
  "VICE1",
  "VICE2",
  "SECRETARY",
  "TRASURER",
  "STUDENT_RELATION",
  "ARTS",
  "ACADEMIC",
  "SPORT",
  "SOCIAL_DEVELOPMENT",
  "KORKOR_CLUB",
  "SCIREN_CLUB",
  "VATA_CLUB",
  "EDUCATION_CLUB",
  "ANURAK_CLUB",
  "ASA_CLUB",
  "ETC",
]);

export const ProjectStatusEnumSchema = z.enum([
  "NOTSTART",
  "INPROGRESS",
  "EVALUATE",
  "COMPLETE",
]);

export const ProjectSchema = z.object({
  id: z.string(),
  published: z.boolean(),
  name: z.string(),
  status: ProjectStatusEnumSchema,
  owner: ProjectOwnerEnumSchema,
});
