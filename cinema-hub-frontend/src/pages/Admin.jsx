import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/http";
import { STALE_TIME } from "../utils/constants";
import Button from "../components/UI/Button";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import ErrorIndicator from "../components/UI/ErrorIndicator";
import UserEditModal from "../components/Admin/UserEditModal";
import UserDeleteModal from "../components/Admin/UserDeleteModal";
import { useState } from "react";
import { queryClient } from "../api/http";
import { makeFirstLetterUpperCase } from "../utils/formatting";
import Pager from "../components/UI/Pager";

export default function Admin() {
  const [editUser, setEditUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [page, setPage] = useState(1);

  const userLimit = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", { page }],
    queryFn: () => fetchUsers({ page, limit: userLimit }),
    staleTime: STALE_TIME,
  });

  console.log(data);

  document.title = "Admin";

  if (isLoading) return <LoadingIndicator />;

  if (isError)
    return <ErrorIndicator title="Failed to fetch users" message={error} />;

  const handleEditUser = (user) => {
    setEditUser(user);
    setIsEditing(true);
  };

  const handleDeleteUser = (user) => {
    console.log("Delete user with ID:", user._id);
    setEditUser(user);
    setIsDeleting(true);
  };

  const handleCloseModal = () => {
    setEditUser(null);
    setIsEditing(false);
    setIsDeleting(false);
  };

  const refetchUsers = () => {
    setEditUser(null);
    setIsEditing(false);
    setIsDeleting(false);
    queryClient.invalidateQueries(["users"]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className="container mx-auto mt-5 p-4 flex flex-col items-center justify-center bg-base-200 rounded-lg shadow-lg"
    >
      {isEditing && (
        <UserEditModal
          user={editUser}
          onClose={handleCloseModal}
          onSubmit={refetchUsers}
          open={editUser !== null}
        />
      )}

      {isDeleting && (
        <UserDeleteModal
          user={editUser}
          onClose={handleCloseModal}
          open={isDeleting}
          onSubmit={refetchUsers}
        />
      )}

      <h1 className="text-5xl font-extrabold mb-4 text-accent text-center">
        Admin Dashboard
      </h1>

      <h2 className="text-3xl font-bold mb-4 text-accent text-center">Users</h2>
      <div className="overflow-x-auto w-full lg:w-1/2">
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="table w-full rounded-lg overflow-hidden"
        >
          <thead className="bg-base-300 text-base-content rounded-t-lg">
            <tr>
              <th className="whitespace-nowrap">Username</th>
              <th className="whitespace-nowrap">Email</th>
              <th className="whitespace-nowrap">Role</th>
              <th className="whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-base-100 text-base-content rounded-b-lg">
            {data.users.map((user, index) => (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 * index }}
                key={user._id}
                className="text-start"
              >
                <td className="whitespace-nowrap text-sm">{user.username}</td>
                <td className="whitespace-nowrap text-sm">{user.email}</td>
                <td className="whitespace-nowrap text-sm">
                  {makeFirstLetterUpperCase(user.role)}
                </td>
                <td className="flex flex-col sm:flex-row gap-2 md:p-2">
                  <Button
                    className="p-3 btn btn-accent text-primary-content rounded-lg min-h-[40px] w-full sm:w-auto"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="p-3 btn btn-error text-primary-content rounded-lg min-h-[40px] w-full sm:w-auto"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
        {data?.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-4"
          >
            <Pager
              totalPages={data.totalPages}
              currentPage={page}
              setCurrentPage={setPage}
            />
          </motion.div>
        )}
      </div>
      {data.users.length === 0 && (
        <p className="text-xl mb-8 text-black text-center">No users found</p>
      )}
    </motion.div>
  );
}
