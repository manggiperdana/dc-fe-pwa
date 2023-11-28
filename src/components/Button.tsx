function Button({ title }: { title: string }) {
  return (
    <button
      type="submit"
      className="block bg-indigo-600 mt-4 py-2 px-4 rounded-2xl text-white font-semibold mb-2"
    >
      {title}
    </button>
  );
}

export default Button;
