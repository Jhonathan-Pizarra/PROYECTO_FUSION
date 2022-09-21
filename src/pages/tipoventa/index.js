import ReadSalesType from "@/components/saleType/ReadSalesType";
import {Layout} from "@/components/others/layout";
import {withSSRAuth} from "@/hocs/withSSRAuth"

const TipoVenta = () => {


    return(
        <>
            <Layout>
            <ReadSalesType/>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default TipoVenta
