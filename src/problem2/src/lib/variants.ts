import { tv } from "tailwind-variants";

export const layoutVariants = tv({
  slots: {
    containerVariants:
      "min-h-screen bg-background bg-[url(/background.jpg)] bg-cover bg-center bg-no-repeat px-6 text-foreground",
    headerVariants: "h-24 py-3",
    mainVariants:
      "min-h-[calc(100vh-12rem)] lg:min-h-[calc(100vh-11rem)] overflow-y-auto py-3",
    footerVariants: "h-24 lg:h-20",
  },
});

const { containerVariants, headerVariants, mainVariants, footerVariants } =
  layoutVariants();

export { containerVariants, headerVariants, mainVariants, footerVariants };

export const sectionBlurVariants = tv({
  base: "border-transparent bg-background/10 drop-shadow-2xl backdrop-blur-sm dark:bg-background/50 dark:backdrop-blur-xs",
});
