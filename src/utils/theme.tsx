import { FC } from "react";
import { Notifications } from "@mantine/notifications";
import { MantineProvider, createTheme } from "@mantine/core";
import { AppThemeProviderProps } from "src/types/types/mantine";

export const AppMantineProvider: FC<AppThemeProviderProps> = ({ children }) => {
    return (
        <MantineProvider theme={theme}>
            <Notifications />
            {children}
        </MantineProvider>
    );
};

const generateColors = (color: string) => {
    return Array(10).fill(color) as [
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
        string,
    ];
};

const theme = createTheme({
    fontFamily: "Rubik, sans-serif",
    breakpoints: {
        xs: "576px",
        sm: "768px",
        md: "992px",
        lg: "1200px",
        xl: "1400px",
        x2l: "1600px",
        x3l: "1800px",
        x4l: "2000px",
    },

    fontSizes: {
        xs: "12px",
        sm: "14px",
        md: "16px",
        lg: "18px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "28px",
        "4xl": "32px",
        "5xl": "40px",
    },
    headings: {
        sizes: {
            h1: {
                fontSize: "32px",
                fontWeight: "500",
                lineHeight: "40px",
            },
            h2: {
                fontSize: "24px",
                fontWeight: "500",
                lineHeight: "24px",
            },
            h3: {
                fontSize: "20px",
                fontWeight: "500",
                lineHeight: "20px",
            },
            h4: {
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "24px",
            },
            h5: {
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "16px",
            },
            h6: {
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "14px",
            },
        },
    },
    colors: {
        baseDark: generateColors("#1E305E"),
        primaryDark: generateColors("#101828"),
        secondaryDark: generateColors("#192A56"),
        base: generateColors("#18569E"),
        primary: generateColors("#FFFFFF"),
        secondary: generateColors("#797E8B"),
        weakDark: generateColors("#6A7A98"),
    },
    components: {},
});