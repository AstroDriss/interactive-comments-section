import { useState } from "react";

const useScore = (initialScore: number) => {
  const [score, setScore] = useState(initialScore);

  const upvote = () => {
    if (score <= initialScore) setScore((prev) => prev + 1);
  };

  const downvote = () => {
    if (score >= initialScore) setScore((prev) => prev - 1);
  };

  return { score, upvote, downvote };
};

export default useScore;
