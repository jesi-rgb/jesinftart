import Layout from "@/components/Layout";
import MintingPage from "@/components/MintingPage";
import { useState, useEffect } from "react";
import { COLLECTION_MANAGER_ADDRESS } from "@/lib/utils";

export default function SketchTest() {
  const [collectionAddress, setCollectionAddress] = useState(undefined);

  // Get the token URI in JSON format
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `/api/getCollections?contractAddress=${COLLECTION_MANAGER_ADDRESS}`
      );
      setCollectionAddress((await response.json())[0].returnValues.collection);
    };
    if (collectionAddress === undefined) {
      getData();
    }
  }, [collectionAddress]);

  return (
    <>
      <Layout>
        <MintingPage collectionAddress={collectionAddress} />
      </Layout>
    </>
  );
}
