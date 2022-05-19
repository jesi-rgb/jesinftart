import Head from "next/head";
import Layout from "@/components/Layout";
import PieceBody from "@/components/PieceBody";
import { hashes } from "pages/hashes";

const Piece = ({ link, slug }) => {
  return (
    <>
      <Head>
        <title>{slug}</title>
        <meta title="description" content="" />
      </Head>
      <Layout>
        <PieceBody content={slug} />
      </Layout>
    </>
  );
};

export const getStaticProps = async ({ params: { slug } }) => {
  var link = `https://${slug}.ipfs.infura-ipfs.io/`;
  return {
    props: {
      link,
      slug,
    },
  };
};

export const getStaticPaths = async () => {
  let paths = hashes.map((h) => ({
    params: {
      slug: h,
    },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
};

export default Piece;
