import { z } from "zod";

export const FormSchema = z.object({
  parcel_id: z.string().min(10, {
    message: "Username must be at least 10 characters.",
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
  type: z.string(),
  group: z.string(),
  amount: z.string(),
  available: z.boolean(),
  department: z.string(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

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
    label: "งานเพลง",
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
    label: "คณิตศาสตรและวิทยาการคอม",
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