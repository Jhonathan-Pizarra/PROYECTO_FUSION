import MainCampaign from "@/components/campaign/MainCampaign";
import {Layout} from "@/components/others/layout";
import {withSSRAuth} from "@/hocs/withSSRAuth"

const Campania = () => {


    return(
        <>
            <Layout>
                <MainCampaign/>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default Campania
