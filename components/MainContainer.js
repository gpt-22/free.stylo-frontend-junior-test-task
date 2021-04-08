import Head from "next/head";
import Navbar from "./Navbar";

const MainContainer = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{ `${title} | Twitch Videos` }</title>

        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      <div className="container">
        { children }
      </div>
    </>
  );
};

export default MainContainer;
