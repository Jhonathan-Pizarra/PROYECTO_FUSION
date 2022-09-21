import {Layout} from "@/components/others/layout";
import {withSSRAuth} from "@/hocs/withSSRAuth"

// import {Auth} from "aws-amplify";
const Home = ({userName}) =>  {
  // const {  signOut } = Auth
  // async function handle() {
  //   await Auth.signOut()
  // }
  return (
      <Layout>
        <div>Hola Mundo!{userName}</div>
        {/* <button onClick={handle}>Sign Out</button> */}
      </Layout>
  )
}

export async function getServerSideProps(context) {
  return withSSRAuth(context)
}

export default Home;