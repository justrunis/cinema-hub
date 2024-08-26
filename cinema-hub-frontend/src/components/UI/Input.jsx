import { motion } from "framer-motion";
import { useState } from "react";

export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  labelClassName,
  inputClassName,
  delay = 0,
}) {
  return (
    <div className="flex flex-col mb-4">
      <motion.label
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        htmlFor={name}
        className={labelClassName}
      >
        {label}
      </motion.label>
      <motion.input
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={inputClassName}
      />
    </div>
  );
}
