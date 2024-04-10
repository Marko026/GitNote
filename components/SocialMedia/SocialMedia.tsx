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
      <AlertDialog open={open} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <Button className="!focus:outline-none absolute right-0  top-[-8px]  !border-none bg-transparent focus:ring-0">
            <EditIcon size={12} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="p-0">
          {/* SocialEdit */}
          <SocialEdit userSocial={userSocial} onOpenChange={setIsOpen} />
          <AlertDialogFooter>
            <AlertDialogCancel className="paragraph-4-regular absolute right-4 top-0 !border-none !bg-black-800 px-4 py-2 uppercase hover:!bg-black-700 hover:text-white-100 md:top-10 lg:top-5">
              x
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default SocialMedia;
