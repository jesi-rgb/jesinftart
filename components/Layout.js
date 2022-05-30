import Footer from "@/components/Footer";
import Meta from "@/components/meta";
import { Rinkeby, Kovan, DAppProvider } from "@usedapp/core";
import Header from "./Header";

export const Layout = ({ children }) => {
  return (
    <>
      <DAppProvider
        config={{
          readOnlyChainId: [Kovan.chainId, Rinkeby.chainId],
          readOnlyUrls: {
            // [Kovan.chainId]: getDefaultProvider("kovan"),
            [Rinkeby.chainId]: `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`,
          },
          notifications: {
            expirationPeriod: 1000,
            checkInterval: 1000,
          },
        }}
      >
        <Meta />
        {/* <div className="md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto"> */}
        <div className="mx-auto max-w-xs lg:max-w-lg xl:max-w-4xl selection:bg-slate-200 selection:text-slate-800">
          <Header />
          {children}
          <Footer />
        </div>
      </DAppProvider>
    </>
  );
};

export default Layout;
