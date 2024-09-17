import { motion } from "framer-motion";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { validateResetPasswordForm } from "../utils/validation";
import { resetPassword } from "../api/http";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [fields, setFields] = useState({
    password: "",
    confirmPassword: "",
  });

  const { token } = useParams();

  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onError: (error) => {
      alert(error.response.data.message);
    },
    onSuccess: (response) => {
      setFields({ password: "", confirmPassword: "" });
      alert(response.data.message);
      navigate("/login");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const validationResponse = validateResetPasswordForm(fields);
    if (validationResponse) {
      alert(validationResponse);
    } else {
      mutate({
        token,
        password: fields.password,
        passwordRepeat: fields.confirmPassword,
      });
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
      <h1 className="text-4xl font-bold text-center mt-8">
        Create a new password
      </h1>
      <form className="flex flex-col items-center mt-4 w-full lg:w-1/2">
        <Input
          type="password"
          label="New Password"
          placeholder="Enter new password"
          inputClassName="bg-base-100 text-base-content w-60 h-10 p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          value={fields.password}
          onChange={(e) => setFields({ ...fields, password: e.target.value })}
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm new password"
          inputClassName="bg-base-100 text-base-content w-60 h-10 p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          value={fields.confirmPassword}
          onChange={(e) =>
            setFields({ ...fields, confirmPassword: e.target.value })
          }
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
