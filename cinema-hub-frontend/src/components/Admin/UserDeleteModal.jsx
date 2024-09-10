import { motion } from "framer-motion";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { ALL_ROLES } from "../../utils/constants";
import { useState } from "react";
import { deleteUser } from "../../api/http";

export default function UserDeleteModal({ user, onClose, onSubmit, open }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsDeleting(true);
    const userId = user._id;
    const response = await deleteUser({ userId });
    if (response.status === 200) {
      onSubmit();
    }
  }

  return (
    <Modal onClose={onClose} open={open}>
      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center text-accent">
            Are you sure you want to delete the user {user.username}?
          </h2>
          <p className="text-center text-red-500 font-bold uppercase">
            This action cannot be undone.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              type="button"
              className="btn btn-primary text-primary-content rounded-lg min-h-[40px]"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-success text-primary-content rounded-lg min-h-[40px]"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete User"}
            </Button>
          </div>
        </motion.div>
      </form>
    </Modal>
  );
}
