import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[1440px] mx-auto ">{children}</div>;
};

export default Layout;
