import Head from "next/head";
import Layout from "@/components/Layout";
import PieceBody2 from "@/components/PieceBody2";
import { useRouter } from "next/router";

export default function Nft({ link, slug }) {
  const router = useRouter();
  const { contract, tokenId } = router.query;
  return (
    <>
      <Head>
        <title>{slug}</title>
        <meta title="description" content="" />
      </Head>
      <Layout>
        <PieceBody2 contract={contract} tokenId={tokenId} />
      </Layout>
    </>
  );
}
