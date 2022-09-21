import {withSSRAuth} from "@/hocs/withSSRAuth"
import ReadSource from "@/components/sources/ReadSource";
import {Layout} from "@/components/others/layout";

const Origen = () => {


    return(
        <>
            <Layout>
                <ReadSource/>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default Origen
