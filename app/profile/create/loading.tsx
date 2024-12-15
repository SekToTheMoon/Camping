import { RotateCw } from "lucide-react";

const loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <RotateCw className="animate-spin" size={50} />
    </div>
  );
};
export default loading;
