import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { findUser } from "@/lib/actions/user.action";
import Link from "next/link";
import { formatDateProfile } from "@/lib/utils";
import { UserProps } from "@/database/user.model";
import { TechImage } from "@/constants";
import { getAllPosts } from "@/lib/actions/post.action";
import ContributionGrid from "@/components/contributionGrid/ContributionGrid";
import { Metadata } from "next";
import { authOptions } from "@/lib/authOptions";

export const metadata: Metadata = {
  title: "GitNote",
  description:
    "GitNote is a note-taking app for developers where you can write and share your knowledge with the world.",
};

interface KnowledgePros {
  _id?: string;
  title: string;
}
interface UserFromDB {
  _id: string;
}
interface UserFromDB extends Omit<UserProps, "learningGoals"> {
  learningGoals: { _id: string; title: string; isChecked: string }[];
}

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const allPosts = await getAllPosts({ allPosts: true });

  const user: UserFromDB = await findUser({ email: userEmail });

  return (
    <div className="w-full px-4 py-5 md:px-8">
      <div className="flex flex-col items-center space-y-4 md:flex-row">
        <div className="flex !h-full w-full items-center gap-2 md:gap-5">
          <Image
            src={user.image || "/assets/icons/img-basis.svg"}
            width={90}
            height={90}
            alt="profile-picture"
            className="!h-24 !w-20 object-contain"
          />
          <div>
            <h2 className="h2-bold capitalize ">{user.name}</h2>
            <div className="flex flex-wrap gap-2 ">
              <div className="flex items-center gap-2 text-white-100">
                <Image
                  src="/assets/icons/link.svg"
                  width={11}
                  height={11}
                  alt="link"
                />
                <p className="paragraph-3-regular !text-primary-500">
                  {user.portfolio || "No portfolio"}
                </p>
              </div>

              <div className="paragraph-3-regular flex gap-2 ">
                <Image
                  src="/assets/icons/calendar.svg"
                  width={11}
                  height={11}
                  alt="link"
                />
                Joined May 2023
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-md bg-black-700 py-2 duration-200 hover:bg-black-600 md:w-1/3">
          <Link href={`/profile/${user._id}`} className="w-full">
            <div className="flex items-center justify-center gap-2 text-primary-500">
              <Image
                src="/assets/icons/edit-blue.svg"
                width={11}
                height={11}
                alt="edit"
              />
              Edit Profile
            </div>
          </Link>
        </div>
      </div>
      <h2 className="paragraph-1-bold my-7 !text-white-100">
        Contribution Grid
      </h2>
      <ContributionGrid allPosts={allPosts.posts} />
      <div className="my-5 h-px w-full bg-black-600/20"></div>
      <h2 className="paragraph-1-bold my-7 !text-white-100">Learning Goals</h2>
      <div>
        {user.learningGoals?.map((goal) => (
          <div key={goal._id} className="mb-3 flex gap-2">
            <Image
              src={
                goal.isChecked
                  ? "/assets/icons/check-full.svg"
                  : "/assets/icons/check-empty.svg"
              }
              width={20}
              height={20}
              alt=""
            />
            <p>{goal.title}</p>
          </div>
        ))}
      </div>
      <h2 className="paragraph-1-bold my-7 !text-white-100">
        Technology Stack
      </h2>

      <div className="flex w-full gap-4">
        {user.techStack?.map((stack) => (
          <div key={stack} className="group">
            {TechImage.find((tech) => tech.name === stack)?.image ? (
              <div className="relative">
                <Image
                  src={
                    TechImage.find((tech) => tech.name === stack)?.image ||
                    "/assets/icons/workflow.svg"
                  }
                  width={40}
                  height={40}
                  alt={stack}
                />
                <p className="absolute top-[-25px]  hidden rounded bg-black-700 px-2 text-[12px] capitalize group-hover:block">
                  {stack}
                </p>
              </div>
            ) : (
              <Image
                src="/assets/icons/workflow.svg"
                width={40}
                height={40}
                alt={stack}
              />
            )}
          </div>
        ))}
      </div>

      <h2 className="paragraph-1-bold my-7 !text-white-100">Knowledge level</h2>

      <div>
        {user.knowledge?.map((knowledge: KnowledgePros) => (
          <div key={knowledge._id} className="mb-3 flex items-center gap-2">
            <Image
              src="/assets/icons/check-mark.svg"
              width={20}
              height={20}
              alt=""
            />
            <p>{knowledge.title}</p>
          </div>
        ))}
      </div>

      <h2 className="paragraph-1-bold my-7 !text-white-100">
        Schedule & availability
      </h2>
      {user.availability && (
        <div className="mb-3 flex gap-2">
          <Image src="/assets/icons/user.svg" width={20} height={20} alt="" />
          <p>Available for new projects</p>
        </div>
      )}
      {user.startDate && (
        <div className="mb-3 flex gap-2">
          <Image src="/assets/icons/clock.svg" width={20} height={20} alt="" />
          <p>
            Available from {formatDateProfile(String(user?.startDate))} -
            {formatDateProfile(String(user?.endDate))}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
