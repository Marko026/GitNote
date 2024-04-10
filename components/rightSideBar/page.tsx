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
    <div className="hidden min-h-screen min-w-72 bg-black-800 px-7 pt-10 xxl:block">
      <Link href="/profile" className="mb-12 flex gap-2">
        <Image
          src={user.image || "/assets/icons/img-basis.svg"}
          width={36}
          height={36}
          alt="avatar"
          className="cursor-pointer object-cover"
        />
        <div>
          <p className="paragraph-3-medium !text-white-100">{user.name}</p>
          <p className="paragraph-4-regular">{user.email}</p>
        </div>
      </Link>

      {isProfile && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`mt-5 flex w-full cursor-pointer justify-center gap-2 duration-200 ${
            isProfile && "mb-7"
          } rounded bg-black-600 py-1.5 hover:bg-black-700`}>
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
          <h3 className="paragraph-3-bold mb-4 !text-white-100">Tags</h3>
          <div className="flex flex-col items-start space-y-4">
            {tags.map((item: any, idx: any) => (
              <Tags type="filterTags" key={idx} tag={item} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="paragraph-3-bold mb-4 !text-white-100">
            {isProfile ? "Social Media Links" : "Related Posts"}
          </h3>

          {isProfile && (
            <div className="border border-dashed border-black-600/50"></div>
          )}

          {isProfile && (
            <div className="relative mt-4">
              {socialList.map((item, idx) => (
                <Link
                  key={idx + 1}
                  href={item.socialLink}
                  className="mb-2 flex gap-2"
                  target="_blank">
                  {item.socialLink && (
                    <Image
                      src={SocialImg[idx].image}
                      width={21}
                      height={16}
                      alt="shortcut"
                    />
                  )}
                  <p>{item.username}</p>
                </Link>
              ))}
            </div>
          )}

          <div className="flex flex-col items-start space-y-4">
            {showRelatedPost?.map((item: any) => (
              <Link
                href={`/postDetails/${item._id}`}
                key={item._id}
                className="paragraph-3-medium capitalize ">
                {item.title}
              </Link>
            ))}
          </div>
          {!isProfile && (
            <div
              onClick={() => router.push(`/createPost/${postId}`)}
              className="mt-5 flex w-full cursor-pointer justify-center gap-2 rounded bg-black-600 py-1.5 duration-200 hover:bg-black-700">
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
