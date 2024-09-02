import { motion } from "framer-motion";
import { useState } from "react";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import { validateLoginForm } from "../utils/validation";
import { Link } from "react-router-dom";
import { loginUser, queryClient } from "../api/http";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/slices/login";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      label: "Password",
      type: "password",
      name: "password",
      value: formData.password,
      delay: 0.6,
    },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    const validationResponse = validateLoginForm(formData);
    if (validationResponse) {
      alert(validationResponse);
    } else {
      loginUser({ formData })
        .then((response) => {
          if (response.status === 200) {
            const token = response.data.token;
            dispatch(loginActions.login(token));
            queryClient.clear();
            navigate("/profile");
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          alert("An error occurred. Please try again later.");
        });
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
      password: "",
    });
  }

  return (
    <>
      <h1 className="text-5xl font-extrabold my-4 text-accent text-center">
        Login
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
              Log in
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
              to="/register"
              className="text-accent underline my-2 hover:text-primary"
            >
              Don't have an account? Register here.
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </>
  );
}
