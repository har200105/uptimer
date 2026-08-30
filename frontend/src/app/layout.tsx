import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { apolloClient } from "@/queries/apolloClient";
import ApolloProvider from "@/queries/apolloProvider";
import { ToastContainer } from "react-toastify";
import { MonitorProvider } from "@/context/MonitorContext";
import CacheGate from "@/components/CacheGate";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

const inter = Inter({ subsets: ["latin"] });

dayjs.extend(relativeTime);

export const metadata: Metadata = {
  title: "Uptimer"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={apolloClient}>
          <CacheGate>
            <MonitorProvider>
              {children}
            </MonitorProvider>
          </CacheGate>
          <ToastContainer />
        </ApolloProvider>
      </body>
    </html>
  );
}
