import { FC, ReactElement } from "react";
import { FaCircleNotch } from "react-icons/fa";

const PageLoader: FC = (): ReactElement => {
  return (
    <div className="bg-white/[0.7] flex justify-center items-center z-50 left-0 top-0 absolute h-full w-full">
      <FaCircleNotch className="animate-spin h-6 w-6" size={24} color="#4aa1f3" />
    </div>
  );
};

export default PageLoader;
