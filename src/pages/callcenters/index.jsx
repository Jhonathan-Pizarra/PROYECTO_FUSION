import MainCallcenter from "@/components/callcenter/MainCallcenter";
import {Layout} from "@/components/others/layout";
import {withSSRAuth} from "@/hocs/withSSRAuth"

const Callcenter = () => {

    return (
        <Layout>
            <MainCallcenter />
        </Layout>
    );
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default Callcenter;