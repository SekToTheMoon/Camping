"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Suspense, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchURL = useSearchParams();
  const url = usePathname();
  const searchParams = searchURL.get("search");
  const { replace } = useRouter();
  const [search, setSearch] = useState(searchParams?.toString() || "");

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchURL);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${url}?${params.toString()}`);
  }, 500);

  useEffect(() => {
    // code body
    if (!searchParams) {
      setSearch("");
    }
  }, [searchParams]);

  return (
    <Suspense fallback={<Input disabled={true} className="max-w-xs" />}>
      <Input
        type="text"
        placeholder="Seach Camping..."
        className="max-w-xs"
        onChange={(e) => {
          setSearch(e.target.value);
          handleSearch(e.target.value);
        }}
        value={search}
      />
    </Suspense>
  );
};
export default Search;
