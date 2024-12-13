// rafce
import { categories } from "@/utils/categories";
import Link from "next/link";
const CategoriesList = ({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <div className="grid grid-cols-4 md:grid-cols-7 my-6 font-bold gap-6  ">
      {categories.map((item) => {
        const isActive = item.label === category;
        return (
          <Link href={`/?category=${item.label}${searchTerm}`} key={item.label}>
            <article
              className={` flex flex-col 
              justify-center hover:text-primary hover:scale-110
              hover:duration-300
              items-center ${isActive ? "text-primary" : ""}`}
            >
              <item.icon />
              <p>{item.label}</p>
            </article>
          </Link>
        );
      })}
    </div>
  );
};
export default CategoriesList;
