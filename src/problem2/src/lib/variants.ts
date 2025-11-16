import { tv } from "tailwind-variants";

export const layoutVariants = tv({
  slots: {
    containerVariants:
      "min-h-screen bg-background bg-[url(/background.jpg)] bg-cover bg-center bg-no-repeat px-6 text-foreground",
    headerVariants: "h-24 py-3",
    mainVariants:
      "min-h-[calc(100vh-13.5rem)] lg:min-h-[calc(100vh-11rem)] overflow-y-auto py-8",
    footerVariants: "h-30 lg:h-20",
  },
});

const { containerVariants, headerVariants, mainVariants, footerVariants } =
  layoutVariants();

export { containerVariants, headerVariants, mainVariants, footerVariants };

export const sectionBlurVariants = tv({
  base: "border-transparent bg-background/10 drop-shadow-2xl backdrop-blur-sm dark:bg-background/50 dark:backdrop-blur-xs",
});

export const cardVariants = tv({
  base: "bg-card text-card-foreground",
  variants: {
    glass: {
      true: "border-transparent bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10",
    },
  },
});

export const typographyVariants = tv({
  base: "text-muted dark:text-muted-foreground",
  variants: {
    highlight: {
      true: "text-white dark:text-white font-bold",
    },
  },
});
