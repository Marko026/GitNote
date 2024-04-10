import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"
import Image from "next/image"
import { Dialog } from "../Dialog/Dialog"
import { usePathname } from "next/navigation"
import { Separator } from "../ui/separator"
import { PostType } from "@/constants"
import { extractKeywords } from "@/lib/utils"
import { ICreatePost } from "@/lib/validation"
import { UserProps } from "@/database/user.model"
import { signOut } from "next-auth/react"

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    recentPosts: ICreatePost[]
    session: {
        user: UserProps
    }
}
const MobileView = ({ open, setOpen, recentPosts, session }: Props) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const pathname = usePathname()

    React.useEffect(() => {
        if (
            pathname.includes("/postDetails") ||
            pathname.includes("/explore")
        ) {
            setOpen(false)
            setIsOpen(false)
        }
    }, [pathname])

    return (
        <Drawer
            direction="right"
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen)
            }}
        >
            <DrawerTrigger asChild></DrawerTrigger>
            <DrawerContent className="ml-auto h-full w-[320px] rounded-none !border-none bg-black-800 pt-4 lg:hidden">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="flex items-start justify-between">
                        <Link href="/profile" className="mb-8 flex gap-2">
                            <Image
                                src={
                                    session?.user.image ||
                                    "/assets/icons/img-basis.svg"
                                }
                                width={36}
                                height={36}
                                alt="avatar"
                                className="cursor-pointer object-cover"
                            />
                            <div className="flex flex-col items-start">
                                <p className="paragraph-3-medium !text-white-100">
                                    {session?.user?.name}
                                </p>
                                <p className="paragraph-4-regular">
                                    {session?.user?.email}
                                </p>
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
                            className=" text gradient mb-4 flex min-h-11 w-full items-center justify-center gap-1 rounded"
                        >
                            <Image
                                src="/assets/icons/plus.svg"
                                alt="plus"
                                width={14}
                                height={14}
                            />
                            <p className="mt-[2px] text-white-100">
                                Create Post
                            </p>
                        </Link>
                        <div>
                            <Dialog open={isOpen} setIsOpen={setIsOpen} />
                        </div>
                        <Separator className="my-10 h-[0.68px] w-full bg-white-500 bg-opacity-30" />
                        <div>
                            <h4 className="mb-5 text-white-500">Posts</h4>
                            <div className="flex flex-col space-y-5">
                                {recentPosts?.map((item: any) => (
                                    <Link
                                        href={`/postDetails/${item?._id}`}
                                        key={item._id}
                                        className="flex gap-2"
                                    >
                                        <Image
                                            src={
                                                PostType.find(
                                                    (type) =>
                                                        type.value ===
                                                        item.postType
                                                )?.image || ""
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
                        <Separator className="my-6 h-[0.68px] w-full bg-white-500 bg-opacity-30" />

                        <Button
                            onClick={() => signOut({ callbackUrl: "/login" })}
                            className="paragraph-3-medium flex w-full justify-start gap-3 bg-transparent !pl-0 hover:bg-black-700"
                        >
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
    )
}

export default MobileView
