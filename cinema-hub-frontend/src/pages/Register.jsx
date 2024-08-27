import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { validateRegistrationForm } from "../utils/validation";
import { createUser } from "../api/http";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const formFields = [
    {
      label: "Username",
      type: "text",
      name: "username",
      value: formData.username,
      delay: 0.2,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      value: formData.email,
      delay: 0.4,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: formData.password,
      delay: 0.6,
    },
    {
      label: "Repeat Password",
      type: "password",
      name: "passwordRepeat",
      value: formData.passwordRepeat,
      delay: 0.8,
    },
  ];

  async function handleSubmit(event) {
    event.preventDefault();
    const validationResponse = validateRegistrationForm(formData);
    if (validationResponse) {
      alert(validationResponse);
    } else {
      const response = await createUser({ formData });
      if (response.status === 201) {
        alert("User created successfully!");
        clear();
      } else {
        alert(response.data.message);
      }
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function clear() {
    setFormData({
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
    });
  }

  return (
    <>
      <h1 className="text-5xl font-extrabold my-4 text-accent text-center">
        Register
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto mt-5 px-8 py-10 bg-base-100 rounded-lg shadow-lg max-w-3xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {formFields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={handleChange}
              inputClassName="bg-base-100 text-base-content w-60 h-10 p-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              delay={field.delay}
            />
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-4"
          >
            <Button
              type="submit"
              className="p-3 bg-accent text-primary-content rounded-lg min-h-[40px]"
            >
              Register
            </Button>
            <Button
              type="button"
              className="p-3 bg-warning text-primary-content rounded-lg min-h-[40px]"
              onClick={clear}
            >
              Clear
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <Link
              to="/login"
              className="text-accent underline my-2 hover:text-primary"
            >
              Already have an account? Log in here.
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </>
  );
}
