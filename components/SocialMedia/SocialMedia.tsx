import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import Image from "next/image";
import SocialEdit from "../SociaEdit/SocialEdit";

type DialogProps = {
  open?: boolean;
  setIsOpen: (value: boolean) => void;
};
export function SocialMedia({
  open,
  setIsOpen,
  userSocial,
}: DialogProps & { userSocial: any }) {
  return (
    <div className="relative mt-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <div className="flex gap-2">
          <Image
            src="/assets/icons/shortcut.svg"
            width={21}
            height={16}
            alt="shortcut"
          />
          <p>Some social media</p>
        </div>
      ))}
      <AlertDialog open={open} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button className="absolute bg-transparent !border-none  !focus:outline-none  top-[-8px] right-0 focus:ring-0">
            <EditIcon size={12} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-0">
          {/* SocialEdit */}
          <SocialEdit userSocial={userSocial} onOpenChange={setIsOpen} />
          <AlertDialogFooter>
            <AlertDialogCancel className="absolute !border-none top-0 md:top-10 lg:top-5 !bg-black-800 hover:!bg-black-700 hover:text-white-100 right-4 px-4 py-2 paragraph-4-regular uppercase">
              x
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default SocialMedia;
