// rafce
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
const ImageInput = ({
  defaultImage,
  edit,
}: {
  defaultImage?: string;
  edit: boolean;
}) => {
  const name = "image";
  return (
    <div>
      <Label className="capitalize">{name}</Label>
      <Input
        id={name}
        name={name}
        type="file"
        required={!edit}
        accept="image/*"
      />
      {defaultImage && (
        <section className="h-[300px] md:h-[500px] relative mt-8">
          <Image
            src={defaultImage}
            sizes="100vw"
            alt={name}
            fill
            priority
            className="object-cover rounded-md"
          />
        </section>
      )}
    </div>
  );
};
export default ImageInput;
