import '../styles/index.css';

import { AppProps } from 'next/app';
import NavBar from '../components/Layout/NavBar';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ChakraProvider } from '@chakra-ui/react';
import { WagmiConfig, configureChains, createConfig, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { infuraProvider } from 'wagmi/providers/infura';
import { goerli } from 'viem/chains';

const { publicClient, webSocketPublicClient } = configureChains(
  [goerli, mainnet],
  [publicProvider(), infuraProvider({ apiKey: process.env.INFURA_API_KEY! })]
);

const config = createConfig({
  publicClient,
  webSocketPublicClient,
});

function App({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <WagmiConfig config={config}>
      <ChakraProvider>
        <SessionProvider session={pageProps.session}>
          <NavBar />
          <Component {...pageProps} />
        </SessionProvider>
      </ChakraProvider>
    </WagmiConfig>
  );
}

export default App;
