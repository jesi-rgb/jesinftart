import CanvasPiece from "@/components/CanvasPiece";
import CanvasScript from "@/components/CanvasScript";
import CanvasSketch from "@/components/CanvasSketch";
import Layout from "@/components/Layout";
export default function SketchTest() {
  return (
    <>
      <Layout>
        <CanvasScript
          url={
            "https://gateway.pinata.cloud/ipfs/QmTiGR2DedqBaqgfrTHUspqurHDBLo7txpZXS5KTXUmLtu/index.html"
          }
        />
      </Layout>
    </>
  );
}
