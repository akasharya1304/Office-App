import { Link } from "@remix-run/react";

function Button({ 
  icon = "", 
  text, 
  bgColor='bg-amber-600',
  hoverColor='bg-amber-500', 
  outlineColor='outline-amber-600', 
  disabled = false, 
  handleButtonClick=false,
  type='submit' 
}) {
  return (
    <div className="py-1">
      <button
        onClick={() => handleButtonClick && handleButtonClick()}
        className={`flex disabled:opacity-20 items-center rounded-md ${bgColor} px-3 py-2 text-sm font-semibold
                          text-white shadow-sm hover:${hoverColor} focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 
                          focus-visible:${outlineColor}`}
        disabled={disabled}
        type={type}
      >
        {icon !== "" && (
          <span className="mr-2 scale-150 text-white">{icon}</span>
        )}
        <span>{text}</span>
      </button>
    </div>
  );
}

function LinkButton({path, icon = "", text, variant='' }) {
  return (
    <div className="py-1">
    <Link to={path} 
        className={`flex items-center rounded-md px-3 py-2 text-sm font-semibold 
        ${variant == 'text' 
        ? 'bg-none shadow-none dark:text-gray-500' 
        : 'bg-amber-600 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600' }`}
      >
        {icon !== "" && (
          <span className="mr-2 scale-150 text-white">{icon}</span>
        )}
        <span>{text}</span>
      </Link>
    </div>
  );
}

export {
   Button,
   LinkButton
}
