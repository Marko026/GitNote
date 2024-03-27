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
      <h2 className="paragraph-1-bold mt-10 mb-3 !text-white-100">
        Task Checklist
      </h2>
      {lessonsList?.map((lesson) => (
        <div key={lesson._id} className="flex items-center gap-2  mb-3">
          <Checkbox
            id={lesson._id}
            className="border-2 border-white-500 !text-green-500 text-[14px] h-5 w-5"
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
