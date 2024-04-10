"use client";
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "../../styles/contribution.css";
import { subtractSixMonthsFromDate } from "@/lib/utils";
import { IPost } from "@/database/post.model";
import _ from "lodash";

const ContributionGrid = ({ allPosts }: { allPosts: IPost[] }) => {
  const [values, setValues] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const dateMap = _.groupBy(allPosts, (post) => post.createdAt);

    const values = Object.keys(dateMap).map((date) => ({
      date: date,
      count: dateMap[date].length,
    }));

    setValues(values);
  }, [allPosts]);

  return (
    <div className="flex gap-2">
      <div className="hidden flex-col justify-end md:space-y-1 xxl:flex">
        <p className="text-white-500">Sun</p>
        <p className="text-white-500">Mon</p>
        <p className="text-white-500">Tue</p>
        <p className="text-white-500">Wed</p>
        <p className="text-white-500">Thu</p>
        <p className="text-white-500">Fri</p>
        <p className="text-white-500">Sat</p>
      </div>
      <CalendarHeatmap
        startDate={subtractSixMonthsFromDate(new Date())}
        endDate={new Date()}
        gutterSize={2}
        values={values}
      />
    </div>
  );
};
export default ContributionGrid;
