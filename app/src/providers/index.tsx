import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "../lib/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        {children}
      </HelmetProvider>
    </QueryClientProvider>
  );
}
