import Comment from "./Comment";
import { Comments as CommentsContext } from "../context/CommentsContextProvider";
import { useContext } from "react";
import Reply from "./Reply";

export const Comments = () => {
  const { comments } = useContext(CommentsContext)!;

  return (
    <section className="max-w-[45.5rem] md:p-0 p-4 mx-auto font-rubik grid gap-4">
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}

      <Reply variant="post" />
    </section>
  );
};
