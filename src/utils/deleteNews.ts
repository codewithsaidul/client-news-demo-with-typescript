import Swal from "sweetalert2";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionFn = (id: string[]) => Promise<any>;
type CallbackFn = () => void;


export const deleteNewsHandler = async (ids: string[], actionFn: ActionFn, onSuccess: CallbackFn) => {
  try {
    const { data } = await actionFn(ids);
    if (data?.success) {
      Swal.fire({
        title: "Successfully!",
        text: data.message,
        icon: "success",
      }).then(() => {
        onSuccess?.(); // ✅ callback call korbo alert close er por
      });;
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
