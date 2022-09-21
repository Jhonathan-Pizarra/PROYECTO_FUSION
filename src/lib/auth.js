import {default as AWS_Amplify} from "aws-amplify";

const AUTH = {
    cognito: {
        REGION: process.env.REGION,
        USER_POOL_ID: process.env.USER_POOL_ID,
        APP_CLIENT_ID: process.env.APP_CLIENT_ID,
    },
};

AWS_Amplify.configure({
    Auth: {
        mandatorySignId: true,
        region: AUTH.cognito.REGION,
        userPoolId: AUTH.cognito.USER_POOL_ID,
        userPoolWebClientId: AUTH.cognito.APP_CLIENT_ID,
    },
});

export default AWS_Amplify
