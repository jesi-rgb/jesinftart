
import { useEthers } from "@usedapp/core";

export default function ConnectButton() {
    const { account, chainId, activateBrowserWallet, deactivate, error } = useEthers()
    const isConnected = account !== undefined

    return (
        isConnected ? (
            <div className="text-white">
                Wallet connected
            </div>
        ) : (
            <button className="text-white" onClick={activateBrowserWallet} >
                Connect
            </button>
        )
    )
}
