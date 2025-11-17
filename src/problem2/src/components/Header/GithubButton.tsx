import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

function GithubButton() {
  return (
    <Button
      variant="ghost"
      asChild
      size="icon"
      className="hover:backdrop-blur-md text-accent hover:bg-accent/10 hover:text-accent dark:text-white dark:hover:bg-accent-foreground/10"
    >
      <a
        href="https://github.com/nptay1999/99tech-code-challenge-resolve"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github />
      </a>
    </Button>
  );
}

export default GithubButton;
