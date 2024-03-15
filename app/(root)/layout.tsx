import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1440px] mx-auto ">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
