"use client";

import { Checkbox } from "@/components/ui/checkbox";
export type LessonProps = {
  _id: string;
  title: string;
  lessonDone: boolean;
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

  return (
    <div className="flex flex-col justify-start ">
      <h2 className="paragraph-1-bold mt-10 mb-3 !text-white-100">
        Task Checklist
      </h2>
      {lessonsList?.map((lesson) => (
        <div key={lesson._id} className="flex items-center gap-2  mb-3">
          <Checkbox
            id="terms"
            className="border-2 border-white-500 !text-green-500 text-[14px] h-5 w-5"
          />
          <label htmlFor="terms" className="paragraph-2-regular">
            {lesson.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TaskCheckList;
