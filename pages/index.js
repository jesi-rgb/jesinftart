import { Rinkeby, Kovan, DAppProvider } from "@usedapp/core";
import { getDefaultProvider } from 'ethers'
import Main from "./main";

export default function Home() {

  return (
    <DAppProvider config={{
      readOnlyChainId: Kovan.chainId,
      readOnlyUrls: {
        [Kovan.chainId]: getDefaultProvider('kovan'),
      },
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>

      <Main />
    </DAppProvider >
  );
}
