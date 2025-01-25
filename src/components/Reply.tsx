import { useContext, useRef } from "react";
import { Comments } from "../context/CommentsContextProvider";

interface Props {
  variant?: "post" | "reply";
  parentID?: number;
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
          } gap-3 md:gap-5 [grid-template-areas:"textarea_textarea""profile_button"] md:[grid-template-areas:"profile_textarea_button"] md:grid-cols-[auto_1fr_auto] items-start bg-white py-5 px-4 md:px-6 rounded-xl`}
        >
          <picture className="w-10 self-center md:self-start [grid-area:profile]">
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
            className="p-4 [grid-area:textarea] border resize-none border-grayishBlue focus:outline-none focus:border-moderateBlue rounded-xl"
            defaultValue={replyingTo ? `@${replyingTo} ` : ""}
          ></textarea>

          <button
            onClick={postComment}
            className="px-8 w-fit ml-auto [grid-area:button] py-3 text-white bg-moderateBlue hover:bg-lightGrayishBlue rounded-xl"
          >
            {variant === "post" ? "SEND" : "REPLY"}
          </button>
        </div>
      )}
    </>
  );
};

export default Reply;
