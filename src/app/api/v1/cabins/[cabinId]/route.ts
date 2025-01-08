// LIB
import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";

export const GET = async (
  req: Request,
  { params }: { params: { cabinId: string } }
) => {
  try {
    const { cabinId } = await params;

    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({
      message: "Successfuly retrieved cabin",
      result: { cabin, bookedDates },
    });
  } catch (error) {
    return Response.json({ message: "Cabin not found", error });
  }
};
