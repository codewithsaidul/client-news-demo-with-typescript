import localFont from "next/font/local"

export const switzer = localFont({
    src: [
        {
            path: "/font/switzer/Switzer-Regular.woff2",
            weight: "400",
            style: "normal"
        },
        {
            path: "/font/switzer/Switzer-Medium.woff2",
            weight: "500",
            style: "normal"
        },
        {
            path: "/font/switzer/Switzer-MediumItalic.woff2",
            weight: "500",
            style: "italic"
        },
        {
            path: "/font/switzer/Switzer-Semibold.woff2",
            weight: "600",
            style: "normal"
        },
        {
            path: "/font/switzer/Switzer-SemiboldItalic.woff2",
            weight: "600",
            style: "italic"
        },
        {
            path: "/font/switzer/Switzer-Bold.woff2",
            weight: "700",
            style: "normal"
        },
        {
            path: "/font/switzer/Switzer-BoldItalic.woff2",
            weight: "700",
            style: "italic"
        },
        {
            path: "/font/switzer/Switzer-Extrabold.woff2",
            weight: "800",
            style: "normal"
        },
        {
            path: "/font/switzer/Switzer-ExtraboldItalic.woff2",
            weight: "800",
            style: "italic"
        },
        {
            path: "/font/switzer/Switzer-Black.woff2",
            weight: "900",
            style: "normal"
        },
        {
            path: "/font/switzer/Switzer-BlackItalic.woff2",
            weight: "900",
            style: "italic"
        },
    ],
    variable: "--font-switzer",
    display: "swap"
})