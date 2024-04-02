import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { findUser } from "@/lib/actions/user.action";
import Link from "next/link";
import { formatDateProfile } from "@/lib/utils";

type GoalProps = {
  _id: string;
  title: string;
  isChecked: boolean;
};

const Profile = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const user = await findUser({ email: userEmail });

  return (
    <div className="w-full pt-10 px-8">
      <div className="flex flex-col md:flex-row space-y-4 items-center">
        <div className="flex gap-5 items-center w-full">
          <Image
            src={user.image || "/assets/images/profile.png"}
            width={90}
            height={90}
            alt="profile-picture"
            className="max-w-[60px] "
          />
          <div>
            <h2 className="h2-bold capitalize">{user.name}</h2>
            <div className="flex flex-wrap gap-2 ">
              <div className="flex gap-2 text-white-100">
                <Image
                  src="/assets/icons/link.svg"
                  width={11}
                  height={11}
                  alt="link"
                />
                jsmastery.pro
              </div>
              <div className="flex gap-2 text-white-100">
                <Image
                  src="/assets/icons/location.svg"
                  width={11}
                  height={11}
                  alt="link"
                />
                Zagreb, Croatia
              </div>
              <div className="flex gap-2 text-white-100">
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
        <div className="w-full md:w-1/3 bg-black-700 py-2 rounded-md">
          <Link href={`/profile/${user._id}`} className="w-full">
            <div className="flex text-primary-500 items-center justify-center gap-2">
              <Image
                src="/assets/icons/edit.svg"
                width={11}
                height={11}
                alt="edit"
              />
              Edit Profile
            </div>
          </Link>
        </div>
      </div>
      <h2 className="paragraph-1-bold !text-white-100 my-7">
        Contribution Grid
      </h2>
      <div className="w-full h-44 bg-black-700" />
      <div className="w-full h-[1px] bg-black-600/20 my-5"></div>
      <h2 className="paragraph-1-bold !text-white-100 my-7">Learning Goals</h2>
      <div>
        {user.learningGoals.map((goal: GoalProps) => (
          <div key={goal._id} className="flex gap-2 mb-3">
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
      <h2 className="paragraph-1-bold !text-white-100 my-7">
        Technology Stack
      </h2>

      <h2 className="paragraph-1-bold !text-white-100 my-7">Knowledge level</h2>

      <div>
        {user.knowledge.map((knowledge: GoalProps) => (
          <div key={knowledge._id} className="flex gap-2 mb-3">
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

      <h2 className="paragraph-1-bold !text-white-100 my-7">
        Schedule & availability
      </h2>
      {user.availability && (
        <div className="flex gap-2 mb-3">
          <Image src="/assets/icons/user.svg" width={20} height={20} alt="" />
          <p>Available for new projects</p>
        </div>
      )}
      {user.startDate && (
        <div className="flex gap-2 mb-3">
          <Image src="/assets/icons/clock.svg" width={20} height={20} alt="" />
          <p>
            Available from {formatDateProfile(user.startDate)} -
            {formatDateProfile(user.endDate)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
