import { Main } from "../pages/main/ui/Main";
import { StoreProvider } from "./providers/StoreProvider";

export const App = () => {
  return (
    <StoreProvider>
      <Main />
    </StoreProvider>
  );
};

export default App;
