function InputText({ name, placeholder, icon, type, value }: { name: string, placeholder: string, icon: any, type: string, value: string }) {
  return (
    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
      {icon}
      <input
        className="pl-2 w-full outline-none border-none"
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={value}
      />
    </div>
  );
}

export default InputText;
