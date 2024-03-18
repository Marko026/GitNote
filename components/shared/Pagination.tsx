import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = searchParams.get("page") || 1;

  const createPageUrl = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}}`;
  };

  return (
    <div className="mx-auto flex items-center gap-3 py-10">
      <Button
        onClick={() => {
          router.push(createPageUrl(+currentPage - 1));
        }}>
        Prev
      </Button>
      <p className="text-white-100">CurrentPage</p>
      <Button
        onClick={() => {
          router.push(createPageUrl(+currentPage + 1));
        }}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
