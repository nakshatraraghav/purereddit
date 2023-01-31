import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Provider } from "jotai";

import Layout from "@/layouts/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
