import CarouselImage2 from "@/components/CarouselImage2";
import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { CONTRACT_ADDRESS } from "@/lib/utils.js";

export default function Home() {
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenIdToImg, setTokenIdToImg] = useState({});

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
  }, []);

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
        tokenURI = tokenURI.slice(1, -1); // Remove quotes at the beginning and at the end

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
        tmp_dict[tokenId] = json.image;
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
        <div className="mt-12 mx-auto lg:max-w-min sm:max-w-max">
          <h1 className="text-6xl drop-shadow-xl mx-auto font-bold font-titles text-center text-slate-100 mb-10">
            WebItOS
          </h1>

          <div className="flex flex-col space-y-16 rounded-md drop-shadow-2xl w-full lg:flex-row lg:overflow-x-scroll lg:scrollbar-hide lg:space-y-0 lg:space-x-10">
            {Object.keys(tokenIdToImg).map((tokenId) => {
              return (
                <CarouselImage2
                  key={tokenId}
                  contractAddress={CONTRACT_ADDRESS}
                  tokenId={tokenId}
                  img={tokenIdToImg[tokenId]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
