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
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { WALLET_CONNECT_PROJECT_ID } from '../constants/walletConnect';
import { clientEnv } from '../env/schema.mjs';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, mainnet],
  [
    publicProvider(),
    infuraProvider({ apiKey: clientEnv.NEXT_PUBLIC_INFURA_API_KEY! }),
  ]
);

const config = createConfig({
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'ABCDao',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: WALLET_CONNECT_PROJECT_ID,
        showQrModal: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
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
