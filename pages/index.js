import CarouselImage2 from "@/components/CarouselImage2";
import { hashes } from "@/components/hashes";
import Layout from "../components/Layout";
import { useState, useEffect } from "react";

export default function Home() {
  const contract = "0xbbb8428f3e763af53Fa526a054d4F474cED74b78";
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenIdToImg, setTokenIdToImg] = useState({});
  const [imgUrl, setImgUrl] = useState(undefined);

  // Get the token Ids
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `../../api/getTokenIds?contractAddress=${contract}`
      );
      const events = await response.json();
      let tmp_array = [];
      for (let key in events) {
        tmp_array.push(events[key]["returnValues"]["tokenId"]);
      }
      setTokenIds(tmp_array);
    };
    if (contract !== undefined) {
      console.log("usefect");
      getData();
    }
  }, [contract]);

  // Get the token URIs
  useEffect(() => {
    const getData = async (tokenIds) => {
      let tmp_dict = {};
      for (let tokenId in tokenIds) {
        // Get tokenURI
        let response = await fetch(
          `../../api/callBlockchain?contractAddress=${contract}&method_name=tokenURI&args=[${tokenId}]`
        );
        let tokenURI = await response.text();
        tokenURI = tokenURI.slice(1, -1); // Remove quotes at the beginning and at the end

        // Get NFT JSON
        response = await fetch(tokenURI);
        let json = await response.json();
        tmp_dict[tokenId] = json.image;
      }
      setTokenIdToImg(tmp_dict);
    };
    if (tokenIds.length !== 0) {
      getData(tokenIds);
    }
  }, [tokenIds]);

  console.log(tokenIds);
  console.log(tokenIdToImg);

  return (
    <Layout>
      <div className="text-slate-300 font-body">
        <div className="mt-12 mx-auto lg:max-w-min sm:max-w-max">
          <h1 className="text-6xl drop-shadow-xl mx-auto font-bold font-titles text-center text-slate-100 mb-10">
            WebAzOS
          </h1>

          <div className="flex flex-col space-y-16 rounded-md drop-shadow-2xl w-full lg:flex-row lg:overflow-x-scroll lg:scrollbar-hide lg:space-y-0 lg:space-x-10">
            {Object.keys(tokenIdToImg).map((tokenId) => {
              return (
                <CarouselImage2
                  contractAddress={contract}
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
