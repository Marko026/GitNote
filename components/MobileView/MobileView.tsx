import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import Image from "next/image";
import { Dialog } from "../Dialog/Dialog";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { PostType } from "@/constants";
import { extractKeywords } from "@/lib/utils";
import { ICreatePost } from "@/lib/validation";
import { UserProps } from "@/database/user.model";
import { signOut } from "next-auth/react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  recentPosts: ICreatePost[];
  session: {
    user: UserProps;
  };
};
const MobileView = ({ open, setOpen, recentPosts, session }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname.includes("/postDetails") || pathname.includes("/explore")) {
      setOpen(false);
      setIsOpen(false);
    }
  }, [pathname]);

  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent className="w-[320px] pt-4 bg-black-800 ml-auto h-full rounded-none !border-none lg:hidden">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex justify-between items-start">
            <Link href="/profile" className="flex gap-2 mb-8">
              <Image
                src={session?.user.image || "/assets/icons/img-basis.svg"}
                width={36}
                height={36}
                alt="avatar"
                className="object-cover cursor-pointer"
              />
              <div className="flex flex-col items-start">
                <p className="paragraph-3-medium !text-white-100">
                  {session?.user?.name}
                </p>
                <p className="paragraph-4-regular">{session?.user?.email}</p>
              </div>
            </Link>
            <Image
              onClick={() => setOpen(false)}
              src="/assets/icons/close.svg"
              width={16}
              height={16}
              alt="close"
              className="cursor-pointer"
            />
          </DrawerHeader>
          <div className="px-4">
            <Link
              href="/createPost"
              className=" mb-4 min-h-11 rounded flex justify-center text items-center gradient w-full gap-1">
              <Image
                src="/assets/icons/plus.svg"
                alt="plus"
                width={14}
                height={14}
              />
              <p className="mt-[2px] text-white-100">Create Post</p>
            </Link>
            <div>
              <Dialog open={isOpen} setIsOpen={setIsOpen} />
            </div>
            <Separator className="w-full bg-white-500 bg-opacity-30 my-10 h-[0.68px]" />
            <div>
              <h4 className="text-white-500 mb-5">Posts</h4>
              <div className="flex flex-col space-y-5">
                {recentPosts?.map((item: any) => (
                  <Link
                    href={`/postDetails/${item?._id}`}
                    key={item._id}
                    className="flex gap-2">
                    <Image
                      src={
                        PostType.find((type) => type.value === item.postType)
                          ?.image || ""
                      }
                      width={13}
                      height={13}
                      alt="pc"
                    />
                    <p className="paragraph-3-medium line-clamp-1 capitalize">
                      {extractKeywords(item.title)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <Separator className="w-full bg-white-500 bg-opacity-30 my-6 h-[0.68px]" />

            <Button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-full !pl-0 bg-transparent hover:bg-black-700 flex justify-start gap-3 paragraph-3-medium">
              <Image
                src={"/assets/icons/logout.svg"}
                alt="logout"
                width={20}
                height={20}
              />
              Logout
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileView;
