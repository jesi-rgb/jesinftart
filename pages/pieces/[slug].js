import Head from "next/head";
import Layout from "@/components/Layout";
import PieceBody2 from "@/components/PieceBody2";
import { hashes } from "@/components/hashes";

const Piece = ({ link, slug }) => {
  return (
    <>
      <Head>
        <title>{slug}</title>
        <meta title="description" content="" />
      </Head>
      <Layout>
        <PieceBody2
          slug={slug}
          contract_address={"0xbbb8428f3e763af53Fa526a054d4F474cED74b78"} //TODO
          token_id={"2"}
        />
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
  return {
    paths,
    fallback: false,
  };
};

export default Piece;
