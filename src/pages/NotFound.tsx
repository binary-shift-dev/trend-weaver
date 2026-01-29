import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/40 to-background">
      <Header />
      <main className="container mx-auto px-4 pb-16 pt-12">
        <div className="flex min-h-[50vh] items-center justify-center text-center">
          <div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Tính năng này chưa được phát triển
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
