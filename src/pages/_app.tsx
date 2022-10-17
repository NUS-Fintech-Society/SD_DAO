import { AppProps } from 'next/app';
import NavBar from '../components/Layout/NavBar';
import '../styles/index.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
