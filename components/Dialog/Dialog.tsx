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
        <Button className="flex w-full justify-between bg-black-700 pl-1 pr-0">
          <div className="flex w-full items-center justify-between rounded border border-transparent bg-black-700 px-2 hover:cursor-pointer hover:border-white-500">
            <Image
              src="/assets/icons/search.svg"
              alt="search"
              width={15}
              height={15}
            />
            <div className="paragraph-4-medium ml-2 w-full bg-transparent py-3  text-start !text-white-500 ">
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
          <AlertDialogCancel className="paragraph-4-regular absolute right-4 top-2 h-8 !border-none !bg-black-800 p-2 uppercase hover:!bg-black-700 hover:text-white-100">
            esc
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
