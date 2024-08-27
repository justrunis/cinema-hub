import { motion } from "framer-motion";
import Modal from "../UI/Modal";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { ALL_ROLES } from "../../utils/constants";
import { useState } from "react";
import { updateUser } from "../../api/http";

export default function UserEditModal({ user, onClose, onSubmit, open }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user.username,
    email: user.email,
    role: user.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsEditing(true);
    const response = await updateUser({ userId: user._id, ...editedUser });
    if (response.status === 200) {
      onSubmit();
    }
  }

  return (
    <Modal onClose={onClose} open={open}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col my-2"
        >
          <Input
            label="Username"
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleChange}
            labelClassName="text-lg font-bold"
            inputClassName="input input-bordered"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            labelClassName="text-lg font-bold"
            inputClassName="input input-bordered"
          />
          <motion.label
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-bold"
          >
            Role
          </motion.label>
          <motion.select
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="select select-bordered"
            name="role"
            value={editedUser.role}
            onChange={handleChange}
          >
            {ALL_ROLES.map((role) => (
              <option key={role.id} value={role.name} className="text-lg">
                {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
              </option>
            ))}
          </motion.select>
          <div className="flex gap-4 my-2">
            <Button
              className="btn btn-primary text-primary-content rounded-lg min-h-[40px]"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="btn btn-success text-primary-content rounded-lg min-h-[40px]"
              type="submit"
              disabled={isEditing}
            >
              Update User
            </Button>
          </div>
        </motion.div>
      </form>
    </Modal>
  );
}
