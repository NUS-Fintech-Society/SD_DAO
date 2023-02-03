import { AppProps } from 'next/app';
import NavBar from '../components/Layout/NavBar';
import '../styles/index.css';
import { SessionProvider } from "next-auth/react";
import { Session } from 'next-auth';

function App({ Component, pageProps }: AppProps<{
  session: Session;
}>) {
  return (
    <div className='bg-landing-page bg-no-repeat bg-cover bg-left-top h-screen'>
      <SessionProvider session={pageProps.session}>
      <NavBar />
      <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

export default App;
