import React from "react";

const Tags = ({ tag }: any) => {
  return (
    <>
      <p className="paragraph-3-medium uppercase">{tag.name}</p>
    </>
  );
};

export default Tags;
