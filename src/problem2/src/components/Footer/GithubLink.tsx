import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";

function GithubLink(props: ComponentProps<"a">) {
  return (
    <Button
      asChild
      variant="link"
      className="p-0 inline-block text-white h-5 mx-1"
    >
      <a
        href="https://github.com/nptay1999"
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      />
    </Button>
  );
}

export default GithubLink;
