import { useContext, useRef, useState } from "react";
import { CommentType, Comments } from "../context/CommentsContextProvider";
import Reply from "./Reply";
import useScore from "../hooks/useScore";

interface Props {
  comment: CommentType;
  parentID: number;
}

const CommentContent = ({ comment, parentID }: Props) => {
  const { currentUser, deleteComment, updateComment } = useContext(Comments)!;
  const [editing, setEditing] = useState<number | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | undefined>(undefined);
  const editInputRef = useRef<HTMLTextAreaElement>(null);
  const { score, upvote, downvote } = useScore(comment.score);

  const isUserComment = currentUser?.username === comment.user.username;

  const editComment = (id: number) => {
    if (isUserComment) return setEditing(id);
    alert("Forbidden");
  };

  const onUpdate = () => {
    if (editInputRef.current == null) return;

    const content = editInputRef.current.value
      .replace(`@${comment.replyingTo}`, "")
      .trim();

    updateComment(editing!, content);
    setEditing(null);
  };

  return (
    <>
      <div className="grid grid-rows-[auto_auto] items-start grid-cols-[auto_1fr_auto] gap-4 p-4 bg-white rounded-lg">
        <div className="grid items-center row-span-2 rounded-xl justify-items-center bg-veryLightGray">
          <button
            className={`${
              score > comment.score ? "text-moderateBlue" : ""
            } p-3 text-lightGrayishBlue hover:text-moderateBlue`}
            aria-label="upvote comment"
            title="upvote comment"
            onClick={upvote}
          >
            <svg
              aria-hidden
              width="11"
              height="11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <span className="font-bold text-moderateBlue">{score}</span>
          <button
            className={`${
              score < comment.score ? "text-moderateBlue" : ""
            } p-3 text-lightGrayishBlue hover:text-moderateBlue`}
            aria-label="downvote comment"
            title="downvote comment"
            onClick={downvote}
          >
            <svg
              aria-hidden
              width="11"
              height="3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <picture className="w-9">
            <source srcSet={comment.user.image.webp} type="image/webp" />
            <img
              src={comment.user.image.png}
              alt={`${comment.user.username} profile`}
            />
          </picture>
          <p className="font-bold">{comment.user.username}</p>
          {isUserComment && (
            <p className="px-2 text-white rounded-sm bg-moderateBlue">you</p>
          )}
          <p className="font-light">{comment.createdAt}</p>
        </div>

        {isUserComment ? (
          <div className="flex items-center self-center gap-4">
            <button
              onClick={() => deleteComment(comment.id)}
              className="flex items-center gap-2 transition-colors text-softRed hover:text-paleRed"
            >
              <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                  fill="currentColor"
                />
              </svg>
              Delete
            </button>
            <button
              onClick={() => editComment(comment.id)}
              className="flex items-center gap-2 transition-colors text-moderateBlue hover:text-lightGrayishBlue"
            >
              <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                  fill="currentColor"
                />
              </svg>
              Edit
            </button>
          </div>
        ) : (
          <button
            onClick={() => setReplyingTo(comment.user.username)}
            className="flex items-center gap-2 transition-colors text-moderateBlue hover:text-lightGrayishBlue"
          >
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                fill="currentColor"
              />
            </svg>
            Reply
          </button>
        )}

        {editing == comment.id ? (
          <div className="grid col-span-2 gap-2">
            <textarea
              placeholder="Edit a comment..."
              rows={3}
              className="p-4 border resize-none border-grayishBlue focus:outline-none focus:border-moderateBlue rounded-xl"
              ref={editInputRef}
              defaultValue={`${
                comment.replyingTo ? `@${comment.replyingTo} ` : ""
              }${comment.content}`}
            ></textarea>
            <button
              className="px-4 py-2 text-white bg-moderateBlue hover:bg-lightGrayishBlue rounded-xl justify-self-end"
              onClick={onUpdate}
            >
              UPDATE
            </button>
          </div>
        ) : (
          <p className="col-span-2">
            {comment.replyingTo && (
              <span className="font-bold cursor-pointer text-moderateBlue">
                @{comment.replyingTo}
              </span>
            )}{" "}
            {comment.content}
          </p>
        )}
      </div>
      {!isUserComment && (
        <Reply
          parentID={parentID}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
        />
      )}
    </>
  );
};

export default CommentContent;
