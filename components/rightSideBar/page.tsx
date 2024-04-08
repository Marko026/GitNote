"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Tags from "../tags/Tags";
import { usePathname } from "next/navigation";
import { extractIdFromPath } from "@/lib/utils";
import { getRelatedPosts } from "@/lib/actions/post.action";
import { useRouter } from "next/navigation";
import SocialMedia from "../SocialMedia/SocialMedia";
import { SocialImg } from "@/constants";
import { ISocialLinks } from "@/lib/validation";

interface Props {
  user: {
    name: string;
    email: string;
    image: string;
  };
  tags: any[];
  userSocial: any;
}

const RightSideBar = ({ user, tags, userSocial }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const postId = extractIdFromPath(pathname);
  const [showRelatedPost, setShowRelatedPost] = useState([]);
  const isPostDetails = pathname.includes("postDetails");
  const isProfile = pathname.includes("profile");
  const [isOpen, setIsOpen] = useState(false);

  const socialPlatforms = userSocial?.social
    ? Object.keys(userSocial.social)
    : [];
  const socialList = socialPlatforms.map((item) => userSocial.social[item]);

  useEffect(() => {
    if (!postId) return;
    const fetchRelatedPosts = async () => {
      const relatedPosts = await getRelatedPosts({ postId });
      setShowRelatedPost(relatedPosts);
    };
    fetchRelatedPosts();
  }, [postId]);

  return (
    <div className="bg-black-800 min-w-72 min-h-screen px-7 hidden xxl:block pt-10">
      <Link href="/profile" className="flex gap-2 mb-12">
        <Image
          src={user.image || "/assets/icons/img-basis.svg"}
          width={36}
          height={36}
          alt="avatar"
          className="object-cover cursor-pointer"
        />
        <div>
          <p className="paragraph-3-medium !text-white-100">{user.name}</p>
          <p className="paragraph-4-regular">{user.email}</p>
        </div>
      </Link>

      {isProfile && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full justify-center gap-2 mt-5 cursor-pointer duration-200 ${
            isProfile && "mb-7"
          } bg-black-600 hover:bg-black-700 py-1.5 rounded`}>
          <Image
            src="/assets/icons/blue-plus.svg"
            width={16}
            height={16}
            alt="relatedPost"
            className="cursor-pointer"
          />
          <p className="paragraph-3-medium">Update social link</p>
        </div>
      )}

      {isOpen && (
        <SocialMedia
          open={isOpen}
          setIsOpen={setIsOpen}
          userSocial={userSocial}
        />
      )}

      {!isPostDetails && !isProfile ? (
        <div>
          <h3 className="paragraph-3-bold !text-white-100 mb-4">Tags</h3>
          <div className="flex flex-col items-start space-y-4">
            {tags.map((item: any, idx: any) => (
              <Tags type="filterTags" key={idx} tag={item} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="paragraph-3-bold !text-white-100 mb-4">
            {isProfile ? "Social Media Links" : "Related Posts"}
          </h3>

          {isProfile && (
            <div className="border border-black-600/50 border-dashed"></div>
          )}

          {isProfile && (
            <div className="relative mt-4">
              {socialList.map((item, idx) => (
                <Link
                  href={item.socialLink}
                  className="flex mb-2 gap-2"
                  target="_blank">
                  <Image
                    src={SocialImg[idx].image}
                    width={21}
                    height={16}
                    alt="shortcut"
                  />
                  <p>{item.username}</p>
                </Link>
              ))}
            </div>
          )}

          <div className="flex flex-col items-start space-y-4">
            {showRelatedPost?.map((item: any) => (
              <p key={item._id} className="paragraph-3-medium capitalize ">
                {item.title}
              </p>
            ))}
          </div>
          {!isProfile && (
            <div
              onClick={() => router.push(`/createPost/${postId}`)}
              className="flex w-full justify-center gap-2 mt-5 cursor-pointer duration-200 bg-black-600 hover:bg-black-700 py-1.5 rounded">
              <Image
                src="/assets/icons/blue-plus.svg"
                width={16}
                height={16}
                alt="relatedPost"
                className="cursor-pointer"
              />
              <p className="paragraph-3-medium">New related post</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
