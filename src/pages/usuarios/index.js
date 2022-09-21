import ReadUsers from "@/components/users/ReadUsers";
import {Layout} from "@/components/others/layout";
import {withSSRAuth} from "@/hocs/withSSRAuth"

const Usuarios = () => {

    return(
        <>
            <Layout>
                <ReadUsers/>
            </Layout>
        </>
    );
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default Usuarios
