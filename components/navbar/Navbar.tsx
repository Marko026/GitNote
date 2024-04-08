"use client";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-black-800 py-5 px-10 md:hidden">
      <div className="flex justify-between">
        <Image
          src="/assets/icons/logo.svg"
          width={100}
          height={25}
          alt="logo"
        />
        <Image
          onClick={() => console.log("clicked")}
          src={"/assets/icons/navicon.svg"}
          width={21}
          height={21}
          alt="menu"
        />
      </div>
    </div>
  );
};

export default Navbar;
