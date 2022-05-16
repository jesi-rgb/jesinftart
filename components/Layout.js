import Footer from "@/components/Footer";
import Meta from "@/components/meta";
export const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      {/* <div className="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto"> */}
      <div className="mx-1 xl:mx-auto xl:max-w-4xl">
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
