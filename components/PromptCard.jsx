"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  return (
    <div className="prompt_card glassmorphism w-100">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col overflow-hidden">
            <Link
              href={`/profile/${post.creator._id}?name=${post.creator.username}`}
            >
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h3>
            </Link>
            <p className="font-inter text-sm text-gray-500 truncate">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? userName
                  ? "../assets/icons/tick.svg"
                  : "assets/icons/tick.svg"
                : userName
                ? "../assets/icons/copy.svg"
                : "assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy icon"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer">
        {post.tag.split(",").map((tag) => (
          <span
            onClick={() => {
              handleTagClick && handleTagClick(tag);
            }}
          >
            {" "}
            #{tag.trim()}
          </span>
        ))}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-between gap-4 border-t border-gray-300 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>

          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
