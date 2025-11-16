import Header from "@/components/Header";
import DarkModeProvider from "@/contexts/DarkMode.context";
import Footer from "@/components/Footer/Footer";
import {
  containerVariants,
  headerVariants,
  mainVariants,
  footerVariants,
} from "@/lib/variants";
import TradePanel from "@/components/TradePanel";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <DarkModeProvider>
      <div className={containerVariants()}>
        <Toaster />
        <Header className={headerVariants()} />
        <main className={mainVariants()}>
          <TradePanel />
        </main>
        <Footer className={footerVariants()} />
      </div>
    </DarkModeProvider>
  );
}

export default App;
