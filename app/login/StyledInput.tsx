export function StyledInput(props) {
  return (
    <input
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      type={props.type}
      autoComplete={props.autoComplete}
      required
      className="block bg-transparent w-full transition duration-300 ease-in-out border-0 border-b border-gray-500 py-2 text-white focus:ring-0 focus:border-white focus:ease-in-out"
    />
  );
}
