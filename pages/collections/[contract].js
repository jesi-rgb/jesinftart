import Layout from "@/components/Layout";
import MintingPage from "@/components/MintingPage";
import { useRouter } from "next/router";

export default function SketchTest() {
  const router = useRouter();
  const { contract } = router.query;

  return (
    <>
      <Layout>
        <MintingPage collectionAddress={contract} />
      </Layout>
    </>
  );
}
