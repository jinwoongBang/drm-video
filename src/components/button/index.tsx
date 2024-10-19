import React from "react";

interface IconButtonProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, text, onClick }) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(event);
    event.stopPropagation();
  };

  return (
    <button className="flex flex-col items-center" onClick={handleClick}>
      <Icon className="h-6 w-6 text-white drop-shadow-lx" />
      {text && (
        <span className="text-white text-xs mt-1 drop-shadow">{text}</span>
      )}
    </button>
  );
};

export default IconButton;
