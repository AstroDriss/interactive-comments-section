import {
  CommentType,
  CommentTypeForReplies,
} from "../context/CommentsContextProvider";
import CommentContent from "./CommentContent";

interface Props {
  comment: CommentType | CommentTypeForReplies;
  parentID?: number;
}

const Comment = ({ comment, parentID }: Props) => {
  return (
    <div className="grid gap-[2px]">
      <CommentContent
        comment={comment as CommentType}
        parentID={parentID ?? comment.id}
      />

      {(comment as CommentType).replies &&
        (comment as CommentType).replies.length > 0 && (
          <div className="md:pl-10">
            <ul className="grid gap-4 pl-4 md:pl-12 mt-[8px] border-l border-lightGrayishBlue">
              {(comment as CommentType).replies.map((reply) => (
                <li key={reply.id}>
                  <Comment comment={reply} parentID={comment.id} />
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default Comment;
