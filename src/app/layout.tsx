import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@code-hike/mdx/dist/index.css"
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { infoCourse } from "./course/page.menu";

import { ConfigProvider, type ThemeConfig } from 'antd';

import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `JDOCode-${infoCourse.title}`,
  description: infoCourse.title,
  manifest: "/manifest.json",
  icons: {
    apple: "/icon.png"
  }
};

const theme: ThemeConfig = {
  token: {   
    colorWarning: "#fa8c16",
    colorSuccess: "#13c2c2"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ConfigProvider theme={theme}>
          <AntdRegistry>{children}</AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
