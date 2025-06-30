"use client";
import { useRegisterAdminMutation } from "@/features/auth/registerAdmin/registerAdminAPI";
import { useDeleteUserMutation } from "@/features/user/deleteUser/deleteUserAPI";
import { useGetAllUsersQuery } from "@/features/user/getAllUsers/getAllUsers";
import { useUpdateUserMutation } from "@/features/user/update/updateUserAPI";
import {
  CreateUserFormData,
  IUser,
  UpdateUserFormData,
} from "@/types/client/user.types";
import { dateFormater } from "@/utils/utils";
import { useState } from "react";
import Swal from "sweetalert2";
import LoadingSkeleton from "../loading/LoadingSkeleton";
import CreateUserModal from "../modal/CreateUserModal";
import UpdateUserModal from "../modal/UpdateUserModal";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const AllUsers = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [registerAdmin] = useRegisterAdminMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-10 mt-10">
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
        <LoadingSkeleton />
      </div>
    );
  }

  if (!users) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <p className="text-2xl font-medium font-title">No users Found</p>
      </div>
    );
  }

  // =================== create new user
  const handleCreate = async (adminData: CreateUserFormData) => {
    // API call here
    try {
      const res = await registerAdmin(adminData);

      const responseData = res.data as { message?: string };

      if (responseData?.message) {
        Swal.fire({
          title: responseData?.message,
          icon: "success",
        });
        setOpenCreateModal(false);
      }
    } catch {
      Swal.fire({
        title: "Failed",
        text: "Failed to create new User",
        icon: "error",
      });
      setOpenCreateModal(false);
    }
  };

  const singleUser = (user: IUser) => {
    setSelectedUser(user);
    setOpenUpdateModal(true);
  };

  // ============= update user data ==========
  const handleUpdate = async (adminData: UpdateUserFormData) => {
    // API call here
    try {
      const res = await updateUser({
        id: selectedUser?._id,
        userData: adminData,
      });
      setOpenUpdateModal(false);
      if (res?.data?.acknowledged && res?.data?.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "User info has been updated",
          icon: "success",
        });
      }
    } catch {
      setOpenUpdateModal(false);
      Swal.fire({
        title: "Failed to updte",
        text: "Something went wrong",
        icon: "error",
      });
    }
  };

  // =================== delelete user by id
  const deleteUserByID = async (userId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    try {
      if (result.isConfirmed) {
        const res = await deleteUser(userId);

        if (res?.data?.acknowledged && res?.data?.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
        }
      }
    } catch {
      Swal.fire({
        title: "Failed to Delete!",
        text: "User delete unsuccessfully!",
        icon: "error",
      });
    }
  };

  return (
    <div>
      {/* ============== heading ================= */}
      <div className="flex justify-between items-center border-b pb-7">
        <h2 className="text-3xl font-bold font-title">All Users</h2>
        <div className="flex items-center gap-4">
          <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
            {/* ==================== create new user ======================== */}
            <DialogTrigger asChild>
              <Button>Create User</Button>
            </DialogTrigger>
            <CreateUserModal onSubmit={handleCreate} />
          </Dialog>
        </div>
      </div>

      {/* ====================== users container ========================== */}
      <div className="mt-16">
        {users.length > 0 ? (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Sl No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Create Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user, idx) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="font-medium">{user.role}</TableCell>
                    <TableCell>{dateFormater(user.createdAt)}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        className="bg-blue-500 cursor-pointer"
                        onClick={() => singleUser(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-red-600 cursor-pointer"
                        onClick={() => deleteUserByID(user._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {openUpdateModal && (
              <Dialog open={openUpdateModal} onOpenChange={setOpenUpdateModal}>
                <UpdateUserModal
                  initialData={selectedUser}
                  onSubmit={handleUpdate}
                />
              </Dialog>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[80vh]">
            <p className="text-2xl font-medium font-title">No users Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
