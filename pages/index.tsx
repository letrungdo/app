import AutoLink from "components/AutoLink";
import Layout, { PageMeta } from "components/Layout";
import { DOWNLOAD_OSMOSIS_NOTES_ROUTE, GMO_CHECKIN_ROUTE, SHOPEE_FOOD_GROUP_ORDER } from "constants/routePath";
import React from "react";

const pageMeta: PageMeta = {
    title: "Home",
    description: "Tools for Developer & Students",
};
class IndexPage extends React.Component {
    render() {
        return (
            <Layout meta={pageMeta}>
                <div className="flex flex-col align-items-center">
                    <AutoLink href={DOWNLOAD_OSMOSIS_NOTES_ROUTE}>Download docs osmosis.org notes</AutoLink>
                    <AutoLink href={GMO_CHECKIN_ROUTE}>GMO checkin/checkout</AutoLink>
                    <AutoLink href={SHOPEE_FOOD_GROUP_ORDER}>Shopee Food Group Order</AutoLink>
                </div>
            </Layout>
        );
    }
}

export default IndexPage;
