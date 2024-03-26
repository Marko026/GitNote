import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SearchBox } from "../SearchBox/SearchBox";

export function Dialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full bg-black-700 pl-1 flex justify-between">
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
      <AlertDialogContent className="bg-white-100 p-0">
        <SearchBox />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
