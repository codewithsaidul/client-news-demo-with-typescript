import { INews } from "@/types/client/news.types";
import Swal from "sweetalert2";




// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SavePostUtilityProps = (payload: Partial<INews>) => any


export const savePostUtility = async (id: string, payload: Partial<INews>, message: string, actionFn: SavePostUtilityProps) => {
  try {
    const { data } = await actionFn(payload).unwrap();
    console.log(data)
    if (data?.success) {
      Swal.fire({
        title: "Successfully!",
        text: message,
        icon: "success",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      Swal.fire({
        title: "Failed",
        text: error.message,
        icon: "error",
      });
    }
  }
};