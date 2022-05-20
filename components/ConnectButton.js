import { shrinkHash } from "@/lib/utils";
import { useEthers } from "@usedapp/core";

export default function ConnectButton() {
  const { account, chainId, activateBrowserWallet, deactivate, error } =
    useEthers();
  const isConnected = account !== undefined;

  return isConnected ? (
    <div className="font-body text-gray-400">{shrinkHash(account)}</div>
  ) : (
    <button
      className="text-gray-300 font-body bg-gray-600 hover:bg-gray-500 transition-colors rounded-lg px-3 py-1 border-2 border-l-gray-300"
      onClick={activateBrowserWallet}
    >
      Connect
    </button>
  );
}
