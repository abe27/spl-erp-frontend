import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

const fonts = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <section className={fonts.className}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </section>
    </SessionProvider>
  );
};

export default App;
