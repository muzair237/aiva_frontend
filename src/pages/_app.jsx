import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { store } from '../slices/store';
import '../assets/scss/themes.scss';
import 'animate.css';
import VerticalLayout from '../layouts';
import { getCookie } from '../helpers/common';
import Loader from '../components/Molecules/Loader';

export default function App({ Component, pageProps }) {
  const [isRendered, setIsRendered] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const allowedPages = getCookie('_aivautc');

  useEffect(() => {
    setIsRendered(true);
    router.events.on('routeChangeError', () => setLoading(false));
    router.events.on('routeChangeStart', () => setLoading(true));
    router.events.on('routeChangeComplete', () => setLoading(false));

    return () => {
      router.events.off('routeChangeError', () => setLoading(false));
      router.events.off('routeChangeStart', () => setLoading(true));
      router.events.off('routeChangeComplete', () => setLoading(false));
    };
  }, [router.events]);

  return (
    isRendered && (
      <Provider store={store}>
        {loading && <Loader />}
        {allowedPages ? (
          <VerticalLayout>
            <Component {...pageProps} />
          </VerticalLayout>
        ) : (
          <Component {...pageProps} />
        )}
        <Toaster
          position="top-center"
          reverseOrder
          gutter={8}
          toastOptions={{
            duration: 4700,
          }}
        />
      </Provider>
    )
  );
}
