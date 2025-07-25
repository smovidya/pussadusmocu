import { z } from "zod";
import {
  type BORROWING_STATUS,
  type Project,
  type Parcel,
} from "@prisma/client";

export type UserData = {
  firstname: string;
  lastname: string;
  ouid: string;
  username: string;
  gecos: string;
  email: string;
  disable: boolean;
  admin: boolean;
  roles: string[];
  firtnameth: string;
  lastnameth: string;
  exp: number;
  iat: number;
  nbf: number;
};

export const ParcelGroupSchema = z.enum([
  "OFFICE",
  "ELECTRONIC",
  "HOME",
  "BUILDING",
  "FUEL",
  "MEDICAL_SCI",
  "ADS",
  "MUSICAL",
  "CLOTHING",
  "COMPUTER",
]);

export const ParcelTypeSchema = z.enum(["NORMAL", "DURABLE", "KEY"]);

export const ParcelDepartmentSchema = z.enum([
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

export const FormSchema = z.object({
  parcel_id: z.string().min(10, {
    message: "id must be at least 10 characters.",
  }),
  parcel_title: z.string(),
  image: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine((file) => !file || (!!file && file.size <= 10 * 1024 * 1024), {
      message: "The profile picture must be a maximum of 10MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Only images are allowed to be sent.",
    })
    .nullable()
    .optional(),
  description: z.string(),
  unit: z.string(),
  type: ParcelTypeSchema,
  group: ParcelGroupSchema,
  amount: z.number().positive().min(1),
  available: z.boolean(),
  department: ParcelDepartmentSchema,
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export const FormSchemaBooking = z.object({
  amount: z.number().positive().min(1),
  description: z.string(),
  project_id: z.string(),
});

export type FormSchemaBookingType = z.infer<typeof FormSchemaBooking>;

export const FormSchemaRegister = z.object({
  project_id: z.string(),
});

export type FormSchemaRegisterType = z.infer<typeof FormSchemaRegister>;

export interface UploadResponse {
  key: string;
}

export const types = [
  {
    value: "NORMAL",
    label: "ทั่วไป",
  },
  {
    value: "DURABLE",
    label: "ครุภัณฑ์",
  },
  {
    value: "KEY",
    label: "กุญแจ",
  },
];

export const groups = [
  {
    value: "OFFICE",
    label: "สำนักงาน",
  },
  {
    value: "ELECTRONIC",
    label: "เครื่องใช้ไฟฟ้า",
  },
  {
    value: "HOME",
    label: "งานบ้าน",
  },
  {
    value: "BUILDING",
    label: "งานก่อสร้าง",
  },
  {
    value: "FUEL",
    label: "เชื้อเพลิง",
  },
  {
    value: "MEDICAL_SCI",
    label: "อุปกรณ์วิทยาศาสตร์และการแพทย์",
  },
  {
    value: "ADS",
    label: "งานโฆษณา",
  },
  {
    value: "MUSICAL",
    label: "งานเพลงและสันทนาการ",
  },
  {
    value: "CLOTHING",
    label: "เสื้อผ้า",
  },
  {
    value: "COMPUTER",
    label: "คอมพิวเตอร์",
  },
];

export const departments = [
  {
    value: "SMO",
    label: "สโม",
  },
  {
    value: "MATHCOM",
    label: "คณิตศาสตร์และวิทยาการคอม",
  },
  {
    value: "MARINE",
    label: "Marine",
  },
  {
    value: "CHEM",
    label: "เคมี",
  },
  {
    value: "CHEMTECH",
    label: "เคมีเทคนิค",
  },
  {
    value: "BIO",
    label: "ชีววิทยา",
  },
  {
    value: "BIOCHEM",
    label: "ชีวเคมี",
  },
  {
    value: "BSAC",
    label: "BSAC",
  },
  {
    value: "BBTECH",
    label: "BBTECH",
  },
  {
    value: "FOODTECH",
    label: "Food Tech",
  },
  {
    value: "MATSCI",
    label: "วัสดุศาสตร์",
  },
  {
    value: "PHYSICS",
    label: "ฟิสิกส์",
  },
  {
    value: "BOTGEN",
    label: "พฤษศาสตร์และพันธุกรรม",
  },
  {
    value: "MICROBIO",
    label: "Micro biology",
  },
  {
    value: "PHOTO",
    label: "Photo",
  },
  {
    value: "GEO",
    label: "ธรณีวิทยา",
  },
  {
    value: "ENVI",
    label: "สิ่งแวดล้อม",
  },
  {
    value: "NISIT_OFFICER",
    label: "กิจการนิสิต",
  },
];

export interface Projectinparcel {
  id: string;
  parcel_id: string;
  project_id: string;
  amount: number;
  description: string;
  status: BORROWING_STATUS;
  startDate: Date;
  endDate: Date;
  project: Project;
  parcel: Parcel;
}

export type Parcellist = Record<string, Projectinparcel[]>;

export const STUDENT_ID = process.env.STUDENT_ID ?? "9999999"; // THIS MUST EXIST IN THE DB
export const DeeAppId = process.env.DEE_APP_ID ?? "";
export const DeeAppSecret = process.env.DEE_APP_SECRET ?? "";
export const encryptionKey = process.env.ENCRYPTION_KEY ?? "";
export const algorithm = process.env.ALGORITHM ?? "";
export const LINE_TOKEN = process.env.LINE_TOKEN ?? "";
export const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY ?? "";
export const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL ?? "";
