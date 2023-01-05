import Layout, { PageMeta } from "components/Layout";
import Link from "next/link";

const pageMeta: PageMeta = {
    title: "Deeplink test",
    description: "Deeplink test",
};

function Deeplink() {
    return (
        <Layout meta={pageMeta}>
            <Link href="kcsta://guide.inc">KCSTA logout</Link>
        </Layout>
    );
}

export default Deeplink;
