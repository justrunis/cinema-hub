import { motion } from "framer-motion";
import Modal from "./Modal";

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  message,
  title = "Confirm",
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-lg">{message}</p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="btn btn-success text-primary-content"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="btn btn-error text-primary-content"
          >
            Close
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}
