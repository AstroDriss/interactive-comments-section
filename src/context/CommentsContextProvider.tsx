import { useEffect, useState, createContext, ReactNode } from "react";
import useConfirm from "../hooks/useConfirm";

interface User {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

export interface CommentTypeForReplies {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
}

export type CommentType = CommentTypeForReplies & {
  replies: CommentTypeForReplies[] | [];
};

interface CommentsContext {
  comments: CommentType[];
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
  currentUser: User | undefined;
  deleteComment: (id: number) => void;
  updateComment: (id: number, content: string) => void;
  createComment: (
    content: string,
    parentID?: number,
    replyingTo?: string
  ) => void;
}

export const Comments = createContext<CommentsContext | null>(null);

const CommentsContextProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const { confirm } = useConfirm();

  const deleteComment = async (id: number) => {
    if (comments == undefined) return;

    const isConfirmed = await confirm();

    if (!isConfirmed) return;

    const newComments = comments
      .map((comment) => {
        const newReplies = comment.replies.filter((reply) => reply.id != id);

        return { ...comment, replies: newReplies };
      })
      .filter((comment) => comment.id != id);
    setComments(newComments);
  };

  const updateComment = (id: number, content: string) => {
    if (comments === undefined) return;

    const newComments = comments.map((comment) => {
      if (comment.id === id) return { ...comment, content };
      else if (comment.replies.length) {
        comment.replies = comment.replies.map((reply) => {
          return {
            ...reply,
            content: reply.id === id ? content : reply.content,
          };
        });
      }
      return comment;
    });

    setComments(newComments);
  };

  const createComment = (
    content: string,
    parentID?: number,
    replyingTo?: string
  ) => {
    const newComment = {
      id: Date.now(),
      user: currentUser!,
      content,
      createdAt: "0 second ago",
      score: 0,
    };

    if (!parentID) {
      setComments([...comments, { ...newComment, replies: [] }]);
    } else {
      setComments(
        comments.map((comment) => {
          if (comment.id == parentID) {
            comment.replies = [
              ...comment.replies,
              { ...newComment, replyingTo },
            ];
          }
          return comment;
        })
      );
    }
  };

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.currentUser);
        setComments(data.comments);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Comments.Provider
      value={{
        comments,
        deleteComment,
        currentUser,
        setComments,
        updateComment,
        createComment,
      }}
    >
      {children}
    </Comments.Provider>
  );
};

export default CommentsContextProvider;
