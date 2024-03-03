import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";

const RightSideBar = () => {
  return (
    <div className="bg-black-800 w-1/3 px-7  pt-10">
      <Link href="/createpost" className="flex gap-[6px] mb-12">
        <Image
          src="/assets/images/avatar01.png"
          width={36}
          height={36}
          alt="avatar"
        />

        <div>
          <p className="paragraph-3-medium !text-white-100">Nikky Eya</p>
          <p className="paragraph-4-regular">nikky@jsmastery.pro</p>
        </div>
      </Link>
      <div>
        <h3 className="paragraph-3-bold !text-white-100 mb-4">Tags</h3>
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 8 }).map((item) => (
            <Link href="">
              <Badge className="rounded paragraph-3-medium bg-black-700">
                Next
              </Badge>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
