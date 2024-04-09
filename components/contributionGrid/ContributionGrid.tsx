"use client";
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "../../styles/contribution.css";
import { subtractSixMonthsFromDate } from "@/lib/utils";
import { IPost } from "@/database/post.model";
import _ from "lodash";

const ContributionGrid = ({ posts }: { posts: IPost[] }) => {
  const [values, setValues] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const dateMap = _.groupBy(posts, (post) => post.createdAt);

    const values = Object.keys(dateMap).map((date) => ({
      date: date,
      count: dateMap[date].length,
    }));

    setValues(values);
  }, [posts]);

  return (
    <div>
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
