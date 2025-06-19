import { type Parcel } from "@prisma/client";
import { Shipping } from "~/components/parcels/Shipping";
import { api } from "~/trpc/server";
import { getCurrentUser } from "~/lib/getCurrentUser";
import { STUDENT_ID } from "~/lib/constant";

const Home = async ({ params }: { params: { id: string } }) => {
  const student = await getCurrentUser();
  
  const mockParcels: Parcel[] = await api.parcel.getRemain({
    student_id: student?.student_id ?? STUDENT_ID,
    project_id: params.id,
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
