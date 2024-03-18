import Image from "next/image";
import React from "react";

const Metric = () => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-2">
        <Image src="/assets/icons/date.svg" width={14} height={14} alt="date" />
        <span className="paragraph-3-regular">14 Feb 2024</span>
      </div>

      <div className="flex items-center gap-2">
        <Image src="/assets/icons/star.svg" width={18} height={18} alt="star" />
        <span className="paragraph-3-regular">10.2k stars</span>
      </div>

      <div className="flex items-center gap-2">
        <Image
          src="/assets/icons/preview.svg"
          width={18}
          height={18}
          alt="preview"
        />
        <span className="paragraph-3-regular">129k views</span>
      </div>
    </div>
  );
};

export default Metric;
