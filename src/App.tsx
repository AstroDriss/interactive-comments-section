import { Comments } from "./components/Comments";
import ConfirmModal from "./components/ConfirmModal";
import CommentsContextProvider from "./context/CommentsContextProvider";
import ConfirmContextProvider from "./context/ConfirmContextProvider";

function App() {
  return (
    <main className="min-h-full bg-veryLightGray">
      <ConfirmContextProvider>
        <CommentsContextProvider>
          <Comments />
          <ConfirmModal />
        </CommentsContextProvider>
      </ConfirmContextProvider>
    </main>
  );
}

export default App;
