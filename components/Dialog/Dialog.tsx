import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SearchBox } from "../SearchBox/SearchBox";

type DialogProps = {
  open?: boolean;
  setIsOpen?: (value: boolean) => void;
};
export function Dialog({ open, setIsOpen }: DialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full bg-black-700 pl-1 pr-0 flex justify-between">
          <div className="flex w-full items-center border border-transparent hover:border-white-500 hover:cursor-pointer bg-black-700 rounded justify-between px-2">
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={15}
              height={15}
            />
            <div className="bg-transparent py-3 w-full text-start ml-2  paragraph-4-medium !text-white-500 ">
              Search...
            </div>
            <Image
              src="/assets/icons/shortcut.svg"
              width={21}
              height={16}
              alt="shortcut"
            />
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0">
        {/* comboBox */}
        <SearchBox />
        <AlertDialogFooter>
          <AlertDialogCancel className="absolute !border-none top-2 h-8 !bg-black-800 hover:!bg-black-700 hover:text-white-100 right-4 p-2 paragraph-4-regular uppercase">
            esc
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
