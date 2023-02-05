import { AppProps } from 'next/app';
import NavBar from '../components/Layout/NavBar';
import '../styles/index.css';
import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth';
import { ChakraProvider } from '@chakra-ui/react';

function App({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  return (
    <ChakraProvider>
    <div className='bg-landing-page h-screen'>
      <SessionProvider session={pageProps.session}>
      <NavBar />
      <Component {...pageProps} />
      </SessionProvider>
    </div>
    </ChakraProvider>
  );
}

export default App;
