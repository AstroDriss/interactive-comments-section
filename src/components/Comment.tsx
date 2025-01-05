import { CommentType } from "../context/CommentsContextProvider";
import CommentContent from "./CommentContent";

interface Props {
  comment: CommentType;
  parentID?: number;
}

const Comment = ({ comment, parentID }: Props) => {
  return (
    <div className="grid gap-4">
      <CommentContent comment={comment} parentID={parentID ?? comment.id} />

      {comment.replies && (
        <div className="pl-10">
          <ul className="grid gap-4 pl-10 border-l border-lightGrayishBlue">
            {comment.replies.map((reply) => (
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
