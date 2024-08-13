import { type Student, type Parcel } from "@prisma/client";
import { cookies } from "next/headers";
import { getCookie } from "cookies-next";
import { Shipping } from "~/app/_components/parcels/Shipping";
import { api } from "~/trpc/server";
import { decrypt } from "~/utils/function";
import { STUDENT_ID } from "~/utils/constant";

const Home = async ({ params }: { params: { id: string } }) => {
  const encryptedCookie = getCookie("student_id", { cookies });
  const student_id = await decrypt(encryptedCookie ?? "");
  const student =
    process.env.NODE_ENV === "development"
      ? await api.auth.getUser({
          student_id: student_id as string,
        })
      : (student_id as Student);
  const mockParcels: Parcel[] = await api.parcel.getRemain({
    student_id: student?.student_id ?? STUDENT_ID,
  });

  return (
    <Shipping
      id={params.id}
      key={params.id}
      parcels={mockParcels}
      student_id={student?.student_id ?? STUDENT_ID}
    />
  );
};

export default Home;
