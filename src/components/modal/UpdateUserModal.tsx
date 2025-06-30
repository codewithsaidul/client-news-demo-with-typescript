  import { Button } from "@/components/ui/button";
  import {
      DialogClose,
      DialogContent,
      DialogDescription,
      DialogFooter,
      DialogHeader,
      DialogTitle,
  } from "@/components/ui/dialog";
  import {
      Form,
      FormControl,
      FormField,
      FormItem,
      FormLabel,
      FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { updateUserSchema } from "@/schema/schema";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useEffect } from "react";
  import { useForm } from "react-hook-form";
  import {
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectLabel,
      SelectTrigger,
      SelectValue,
  } from "../ui/select";
import { IUser, UpdateUserFormData } from "@/types/client/user.types";




  interface UpdateUserModalProps {
    initialData: IUser | null;
    onSubmit: (data: UpdateUserFormData) => void | Promise<void>
  }
  

  export default function UpdateUserModal({
    initialData = null,
    onSubmit,
  }: UpdateUserModalProps) {
    const form = useForm<UpdateUserFormData>({
      resolver: zodResolver(updateUserSchema),
      defaultValues: {
        name: "",
        email: "",
        role: "editor"
      },
    });

    // Set initial data if editing
    useEffect(() => {
      if (initialData) {
        form.reset(initialData);
      }
    }, [initialData, form]);

    const handleSubmit = async (data: UpdateUserFormData) => {
      await onSubmit(data); // parent e handle korbe
    };

    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Update User
          </DialogTitle>
          <DialogDescription>
            Update user info.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* ============= user name =================== */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ======================= email ====================== */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ================== user role ================ */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue=""
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        <SelectItem value="editor" className="text-lg">
                          Editor
                        </SelectItem>
                        <SelectItem value="superadmin" className="text-lg">
                          Super Admin
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Processing..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    );
  }
