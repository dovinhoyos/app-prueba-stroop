import { type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  to: string;
  icon?: ReactNode;
}

const Button = ({ children, to, icon }: Props) => {
  return (
    <Link
      to={to}
      className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-all text-lg w-full max-w-xs"
    >
      {icon}
      {children}
    </Link>
  );
};

export default Button;
