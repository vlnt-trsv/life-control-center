import { Wrapper } from "@/shared/components/ui/wrapper";
import { Dashboard } from "@/widgets/dashboard/ui/Dashboard";
import { Header } from "@/widgets/header/ui/Header";

export const Main = () => {
  return (
    <>
      <Wrapper className="fixed px-4 py-4 justify-end z-5">
        <Header />
      </Wrapper>
      <Dashboard />
    </>
  );
};
