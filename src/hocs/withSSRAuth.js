import {withSSRContext} from 'aws-amplify'

const withSSRAuth = async (context)=>{
    const { Auth } = withSSRContext(context)
    
   try {
    const {attributes,username} = await Auth.currentAuthenticatedUser()
    console.log(username)
    //console.log(data);

    return {
        props: {
            userName:username,
            attributes
        }
    }
   } catch (error) {
    return {
        redirect: {
            permanent: false,
            destination: "/login"
        }
    }
   }
    
}

export {withSSRAuth}