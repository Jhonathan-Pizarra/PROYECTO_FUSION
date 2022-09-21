import ReadClients from "@/components/clients/ReadClients";
import {withSSRAuth} from "@/hocs/withSSRAuth"

const Cliente = () => {

    return(
        <>
            <ReadClients/>
        </>
    );
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default Cliente
