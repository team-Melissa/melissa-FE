import { useEffect, useState } from "react";

export const useLoadingDotAnimation = () => {
  const [loadingDot, setLoadingDot] = useState<"." | ".." | "...">(".");

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    intervalId = setInterval(() => {
      setLoadingDot((prev) => {
        if (prev === ".") {
          return "..";
        } else if (prev === "..") {
          return "...";
        } else {
          return ".";
        }
      });
    }, 700);
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return loadingDot;
};
