function ButtonFull({ title, type }: { title: string, type: "button" | "submit" | "reset" | undefined }) {
  return (
    <button
      type={type}
      className="block w-full bg-indigo-600 mt-4 py-2 px-4 rounded-2xl text-white font-semibold mb-2"
    >
      {title}
    </button>
  );
}

export default ButtonFull;
