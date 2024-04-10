import ProfileDetails from "@/components/profileDetails/ProfileDetails";
import { findUserById } from "@/lib/actions/user.action";
import React from "react";

type ProfileId = {
  id: string;
};

const Page = async ({ params }: { params: ProfileId }) => {
  const { id } = params;

  const userProfileDetails = await findUserById({ id });

  return (
    <div className="w-full pb-10">
      <ProfileDetails user={userProfileDetails} />
    </div>
  );
};

export default Page;
