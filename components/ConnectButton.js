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
      className="text-slate-300 font-body bg-slate-800 hover:bg-slate-600 transition-colors rounded-lg px-3 py-1 border-2 border-slate-600"
      onClick={activateBrowserWallet}
    >
      Connect
    </button>
  );
}
