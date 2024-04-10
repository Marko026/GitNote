"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
export type LessonProps = {
  _id: string;
  title: string;
};

export interface PostProps {
  _id: string;
  title: string;
  postType: string;
  description: string;
  codeSnippet: string;
  content: string;
  lessons: LessonProps[];
  createdAt: string;
}

const TaskCheckList = ({ post }: { post: PostProps }) => {
  const lessonsList = post.lessons;
  const [isChecked, setIsChecked] = useState<string[]>([]);
  const handleCheckboxClick = (lessonId: string) => {
    setIsChecked((prev: string[]) => {
      if (prev.includes(lessonId)) {
        return prev.filter((id) => id !== lessonId);
      } else {
        return [...prev, lessonId];
      }
    });
  };

  return (
    <div className="flex flex-col justify-start ">
      <h2 className="paragraph-1-bold mb-3 mt-10 !text-white-100">
        Task Checklist
      </h2>
      {lessonsList?.map((lesson) => (
        <div key={lesson._id} className="mb-3 flex items-center  gap-2">
          <Checkbox
            id={lesson._id}
            className="size-5 border-2 border-white-500 text-[14px] !text-green-500"
            onClick={() => handleCheckboxClick(lesson._id)}
          />
          <label
            htmlFor={lesson._id}
            className={`paragraph-2-regular ${
              isChecked.includes(lesson._id) && "line-through"
            } `}>
            {lesson.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TaskCheckList;
