import ReadOrder from "@/components/order/ReadOrder";
import {Layout} from "@/components/others/layout";
import {withSSRAuth} from "@/hocs/withSSRAuth"

const Pedido = () => {

    return (
        <>
            <Layout>
                <ReadOrder/>
            </Layout>
            {/*<DrawerOrders/>*/}
        </>
    );
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default Pedido
