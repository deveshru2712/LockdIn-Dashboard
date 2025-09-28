import Blocker from "./Blocker";
import Footer from "./Footer";
import Header from "./Header";

export default function HeroSection() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-12">
      <Header />
      <Blocker />
      <Footer />
    </div>
  );
}
