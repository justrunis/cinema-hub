export default function Select({
  label,
  id,
  error,
  options,
  value,
  renderOption,
  containerClassName,
  ...props
}) {
  return (
    <div className={containerClassName}>
      <label className="block text-sm font-bold" htmlFor={id}>
        {label}
      </label>
      <select id={id} name={id} defaultValue={value} {...props}>
        <option value="">-- Select an option --</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {renderOption(option)}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
}
