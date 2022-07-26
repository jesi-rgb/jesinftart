import Head from "next/head";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useContractFunction, useEthers } from "@usedapp/core";
import MintButton from "@/components/UploadCollection";

import {
  COLLECTION_MANAGER_ADDRESS,
  APPROVED_ADDRESSES_FOR_UPLOADING,
} from "@/lib/utils";
import UploadCollection from "@/components/UploadCollection";

export default function Admin({ slug }) {
  //   const router = useRouter();
  //   const { contract, tokenId } = router.query;

  return (
    <>
      <Head>
        <title>{slug}</title>
        <meta title="description" content="" />
      </Head>
      <Layout>
        <UploadCollection></UploadCollection>
      </Layout>
    </>
  );
}
