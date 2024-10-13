import type { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <>
      <Header />
      <main>{children} </main>
      <Footer />
    </>
  );
}
