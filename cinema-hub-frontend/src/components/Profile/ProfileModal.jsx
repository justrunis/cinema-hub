import { motion } from "framer-motion";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useState } from "react";
import Input from "../UI/Input";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/http";
import { changeBio } from "../../api/http";
import { useSelector } from "react-redux";
import LoadingIndicator from "../UI/LoadingIndicator";

export default function ProfileModal({ isOpen, onClose, currentBio }) {
  const [bio, setBio] = useState(currentBio || "");
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.login.token);

  const { mutate } = useMutation({
    mutationFn: changeBio,
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      onClose();
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSaveChanges = () => {
    setLoading(true);
    mutate({ token, bio });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      {loading && <LoadingIndicator />}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center gap-4 w-full h-full rounded-lg"
      >
        <h1 className="text-2xl font-bold">Edit Bio</h1>
        <div className="flex flex-col gap-4 w-full">
          <Input
            type="text"
            label="Bio"
            name="bio"
            value={bio}
            placeholder="Enter your bio"
            inputClassName="bg-base-100 text-base-content p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            isTextarea={true}
            onChange={(e) => setBio(e.target.value)}
          />
          <Button
            className="btn btn-primary text-primary-content"
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </motion.div>
    </Modal>
  );
}
