import Footer from "@/components/Footer";
import Meta from "@/components/meta";
import { Rinkeby, Kovan, DAppProvider } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import Header from "./Header";

export const Layout = ({ children }) => {
  return (
    <>
      <DAppProvider
        config={{
          readOnlyChainId: [Kovan.chainId, Rinkeby.chainId],
          readOnlyUrls: {
            [Kovan.chainId]: getDefaultProvider("kovan"),
            [Rinkeby.chainId]: getDefaultProvider("rinkeby"),
          },
          notifications: {
            expirationPeriod: 1000,
            checkInterval: 1000,
          },
        }}
      >
        <Meta />
        {/* <div className="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto"> */}
        <div className="mx-1 xl:mx-auto xl:max-w-4xl">
          <Header />
          {children}
          <Footer />
        </div>
      </DAppProvider>
    </>
  );
};

export default Layout;
