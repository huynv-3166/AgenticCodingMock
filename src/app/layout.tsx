import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin", "vietnamese"],
	weight: ["400", "500", "700"],
	style: ["normal", "italic"],
});

const montserratAlternates = Montserrat_Alternates({
	variable: "--font-montserrat-alternates",
	subsets: ["latin", "vietnamese"],
	weight: ["700"],
});

const digitalNumbers = localFont({
	src: "../../public/fonts/DigitalNumbers-Regular.ttf",
	variable: "--font-digital-numbers",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Sun Annual Awards 2025",
	description: "Sun Annual Awards 2025 — Root Further",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body
				className={`${montserrat.variable} ${montserratAlternates.variable} ${digitalNumbers.variable} font-[family-name:var(--font-montserrat)] antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
