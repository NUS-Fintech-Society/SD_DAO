import { AppProps } from "next/app";
import NavBar from "../components/Layout/NavBar";
import "../styles/index.css";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ChakraProvider } from "@chakra-ui/react";
import { withTRPC } from "@trpc/next";
import { ServerRouter } from "../server/router/router";

function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <ChakraProvider>
      <div>
        <SessionProvider session={pageProps.session}>
          <NavBar />
          <Component {...pageProps} />
        </SessionProvider>
      </div>
    </ChakraProvider>
  );
}

try { const client = withTRPC<ServerRouter>({
  config({ ctx }) {
    
    const url =  
       "http://localhost:3000";

    return {
      url,
      headers: {
        "x-ssr": "1",
      },
    };
  },
  ssr: true
  
})(App);

} catch (error) {
  console.log(error);
}
