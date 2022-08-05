import CarouselImage2 from "@/components/CarouselImage2";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { IPFS_PREFIX, IPFS_PROVIDER_URI } from "@/lib/utils.js";

export default function Home() {
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenIdToImg, setTokenIdToImg] = useState({});

  const CONTRACT_ADDRESS = "0x7bdED40a489Bd6680ea0eba0A6AdAD7340a634AD";
  // Get the token Ids
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `/api/getTokenIds?contractAddress=${CONTRACT_ADDRESS}`
      );
      const events = await response.json();
      let tmp_array = [];
      for (let key in events) {
        tmp_array.push(events[key]["returnValues"]["tokenId"]);
      }
      setTokenIds(tmp_array);
    };
    if (CONTRACT_ADDRESS !== undefined) {
      getData();
    }
  }, [CONTRACT_ADDRESS]);

  // Get the token URIs
  useEffect(() => {
    const getData = async (tokenIds) => {
      let tmp_dict = {};
      for (let tokenId in tokenIds) {
        // Get tokenURI
        let response = await fetch(
          `/api/callBlockchain?contractAddress=${CONTRACT_ADDRESS}&method_name=tokenURI&args=[${tokenId}]`
        );
        let tokenURI = await response.text();
        tokenURI = tokenURI
          .slice(1, -1)
          .replace(IPFS_PREFIX, IPFS_PROVIDER_URI); // Remove quotes at the beginning and at the end

        if (tokenURI === "") {
          console.error(
            `Collection: The NFT ${tokenId} of the contract ${CONTRACT_ADDRESS} has an empty URI`
          );
          continue;
        }

        if (
          tokenURI ===
          "Returned error: execution reverted: ERC721URIStorage: URI query for nonexistent token"
        ) {
          continue;
        }

        // Get NFT JSON
        response = await fetch(tokenURI);
        if (!response.ok) {
          console.error(
            `Collection: The NFT ${tokenId} of the contract ${CONTRACT_ADDRESS} couldn't retrieve the JSON in URI. 
            Received response: ${response.status}. URI: ${tokenURI}`
          );
          continue;
        }
        let json = await response.json();
        tmp_dict[tokenId] = json.image.replace(IPFS_PREFIX, IPFS_PROVIDER_URI);
      }
      setTokenIdToImg(tmp_dict);
    };
    if (tokenIds.length !== 0) {
      getData(tokenIds);
    }
  }, [tokenIds]);

  return (
    <Layout>
      <div className="text-slate-300 font-body">
        <div className="mt-12 mx-auto">
          <h1 className="text-6xl drop-shadow-xl mx-auto font-bold font-titles text-center text-slate-100 mb-10">
            WebOtES
          </h1>

          <div className="flex flex-wrap gap-5 md:gap-9 xl:gap-14">
            {Object.keys(tokenIdToImg).map((tokenId) => {
              return (
                <CarouselImage2
                  key={tokenId}
                  contractAddress={CONTRACT_ADDRESS}
                  tokenId={tokenId}
                  img={tokenIdToImg[tokenId]}
                  big={Math.random() < 0.1 ? true : false}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
