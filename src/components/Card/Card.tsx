import { Application } from "../../hooks/Application/types";

export const Card = ({
  id,
  title,
  description,
  company,
  link,
  deadline,
}: Application) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-600">{company}</p>
      <p className="text-xs">{description}</p>
      <p className="text-xs text-blue-500 truncate">{link}</p>
      <p className="text-xs text-right">
        {new Date(deadline).toLocaleDateString()}
      </p>
    </div>
  );
};
