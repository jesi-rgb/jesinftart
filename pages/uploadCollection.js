import Head from "next/head";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

export default function UploadCollection({ link, slug }) {
  //   const router = useRouter();
  //   const { contract, tokenId } = router.query;

  return (
    <>
      <Head>
        <title>{slug}</title>
        <meta title="description" content="" />
      </Head>
      <Layout></Layout>
    </>
  );
}
