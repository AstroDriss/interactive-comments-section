import { useContext, useRef } from "react";
import { Comments } from "../context/CommentsContextProvider";

interface Props {
  variant?: "post" | "reply";
  parentID: number;
  replyingTo?: string;
  setReplyingTo?: (value: undefined | string) => void;
}

const Reply = ({
  variant = "reply",
  parentID,
  replyingTo,
  setReplyingTo,
}: Props) => {
  const { currentUser, createComment } = useContext(Comments)!;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const postComment = () => {
    if (!textareaRef.current) return;
    const content = textareaRef.current?.value
      .replace(`@${replyingTo}`, "")
      .trim();

    if (content.length === 0) return;

    createComment(content, parentID, replyingTo!);

    if (parentID) setReplyingTo!(undefined);

    textareaRef.current.value = "";
  };

  return (
    <>
      {(variant === "post" || replyingTo) && (
        <div
          className={`${
            variant === "post" ? "grid" : replyingTo ? "grid" : "hidden"
          } gap-4 grid-cols-[auto_1fr_auto] items-start bg-white p-5 rounded-xl`}
        >
          <picture className="w-9">
            <source srcSet={currentUser?.image.webp} type="image/webp" />

            <img
              src={currentUser?.image.png}
              alt={`${currentUser?.username} profile`}
            />
          </picture>

          <textarea
            placeholder="Add a comment..."
            ref={textareaRef}
            rows={3}
            autoFocus
            className="p-4 border resize-none border-grayishBlue focus:outline-none focus:border-moderateBlue rounded-xl"
            defaultValue={replyingTo ? `@${replyingTo} ` : ""}
          ></textarea>
          <button
            onClick={postComment}
            className="px-4 py-2 text-white bg-moderateBlue hover:bg-lightGrayishBlue rounded-xl"
          >
            {variant === "post" ? "SEND" : "REPLY"}
          </button>
        </div>
      )}
    </>
  );
};

export default Reply;
