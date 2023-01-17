import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import { ChakraProvider } from "@chakra-ui/react";

const fonts = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }) => {
  return (
    <section className={fonts.className}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </section>
  );
};

export default App;
