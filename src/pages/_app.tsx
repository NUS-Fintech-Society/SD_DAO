import { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
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
