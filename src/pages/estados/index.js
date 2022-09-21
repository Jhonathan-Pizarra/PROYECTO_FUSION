import ReadState from "@/components/states/ReadStates";
import {withSSRAuth} from "@/hocs/withSSRAuth"

const Estado = () => {


    return(
        <>
           <ReadState/>
        </>
    );
}

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}

export default Estado
