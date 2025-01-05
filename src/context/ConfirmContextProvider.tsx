import { createContext, useState } from "react";

export const ConfirmContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | null
>(null);

const ConfirmContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(false);

  return (
    <ConfirmContext.Provider value={[state, setState]}>
      {children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmContextProvider;
