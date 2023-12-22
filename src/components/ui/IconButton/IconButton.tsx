const IconButton = ({ icon, label, onClick }) => {
  return (
    <button
      color="primary"
      className="flex items-center text-black px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium bg-transparent focus:outline-none focus:ring"
      onClick={onClick}
    >
      <span className={label ? "mr-2" : ""}>
        {
          typeof label === "string" ? icon : <img src={icon} alt="image" />
        }
      </span>
      {label && <span>{label}</span>}
    </button>
  );
};

export default IconButton;
