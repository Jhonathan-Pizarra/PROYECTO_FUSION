import '../styles/globals.css'
import config from "../aws-exports";
import {Amplify} from "aws-amplify";

Amplify.configure({
  ...config,
  ssr: true
})

function App({ Component, pageProps }) {
  return (
    <Component {...pageProps} />
  )
}

export default App
