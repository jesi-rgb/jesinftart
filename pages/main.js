import CarouselImage from "@/components/CarouselImage";
import { hashes } from "@/components/hashes";
import Layout from "../components/Layout";
import { useEthers } from "@usedapp/core";

export default function Main() {
    const { account, chainId, activateBrowserWallet, deactivate, error } = useEthers()
    const isConnected = account !== undefined

    const decorator = () => {
        console.log("aaa")
        console.log(error)
        console.log(account)
        console.log(chainId)
        console.log(activateBrowserWallet)
        activateBrowserWallet()
    }

    return (
        <Layout>
            <button className="text-white" onClick={decorator}>Conect wallet</button>

            <div className="text-gray-300 font-body">
                <div className="px-5 mt-12 mx-auto lg:max-w-min sm:max-w-max">
                    <h1 className="text-6xl drop-shadow-xl mx-auto font-bold font-titles text-center text-gray-100 mb-10">
                        WebOS
                    </h1>

                    <div className="flex flex-col space-y-16 rounded-md drop-shadow-2xl w-full lg:flex-row lg:overflow-x-scroll lg:scrollbar-hide lg:space-y-0 lg:space-x-10">
                        {hashes.map((h) => {
                            return <CarouselImage key={h} hash={h} />;
                        })}
                    </div>
                </div>
            </div>
        </Layout >
    )
}
