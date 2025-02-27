import { BsCloudCheck } from "react-icons/bs";
export const DocumentInput = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="truncate text-lg px-1.5 cursor-pointer">
        Untitled docs
      </span>
      <BsCloudCheck />
    </div>
  );
};
