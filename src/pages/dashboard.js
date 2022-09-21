import {Auth} from "aws-amplify";
import {useRouter} from "next/router";
import Routes from "@/constants/routes";
import {Layout} from "@/components/others/layout";
import {withSSRAuth} from "@/hocs/withSSRAuth"

const Dashboard = ({userName}) => {
    const router = useRouter();

    const handleLogOut = async () => {
        await Auth.signOut();
        await router.push(`${Routes.LOGIN}`);
    };    
    return (
        <Layout>
        <div>
            <p>Bienvenido, {userName}</p>

            <button
                onClick={handleLogOut}
            >
                Log out
            </button>
        </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    return withSSRAuth(context)
}
export default Dashboard;