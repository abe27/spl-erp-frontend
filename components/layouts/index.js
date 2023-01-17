import  { NavBar } from "@/components";

const MainLayout = ({ children }) => {
  return (
    <div className="isolate bg-white">
      <NavBar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
