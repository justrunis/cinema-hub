import { motion } from "framer-motion";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/http";
import { validateForgotPasswordForm } from "../utils/validation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      alert(data.data.message);
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const validationResponse = validateForgotPasswordForm({ email });
    if (validationResponse) {
      alert(validationResponse);
    } else {
      mutate({ email });
      setEmail("");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.2 }}
      className="container mx-auto mt-5 p-4 flex flex-col items-center justify-center bg-base-200 rounded-lg shadow-lg"
    >
      <h1 className="text-4xl font-bold text-center mt-8">Reset Password</h1>
      <form className="flex flex-col items-center mt-4 w-full lg:w-1/2">
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputClassName="bg-base-100 text-base-content w-60 h-10 p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        <Button
          type="submit"
          className="p-3 bg-accent text-primary-content rounded-lg min-h-[40px]"
          onClick={handleSubmit}
        >
          Reset Password
        </Button>
      </form>
    </motion.div>
  );
}
