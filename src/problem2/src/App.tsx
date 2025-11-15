import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import DarkModeProvider from "@/DarkMode.context";
import Footer from "@/components/Footer/Footer";
import {
  containerVariants,
  headerVariants,
  mainVariants,
  footerVariants,
} from "@/lib/variants";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  return (
    <DarkModeProvider>
      <div className={containerVariants()}>
        <Header className={headerVariants()} />
        <main className={mainVariants()}>
          <h1 className="text-red-500 text-2xl">{t("HELLO")}</h1>
          <Button>Click me</Button>
        </main>
        <Footer className={footerVariants()} />
      </div>
    </DarkModeProvider>
  );
}

export default App;
