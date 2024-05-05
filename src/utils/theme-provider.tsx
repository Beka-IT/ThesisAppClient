import React, { createContext, useContext, useReducer, Dispatch, ReactNode } from "react";

type Theme = "light" | "dark";

interface State {
    theme: Theme;
}

interface Action {
    type: "TOGGLE_THEME";
}

type ContextType = {
    state: State;
    dispatch: Dispatch<Action>;
};

const initialState: State = { theme: "light" };

const ThemeContext = createContext<ContextType | undefined>(undefined);

const themeReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "TOGGLE_THEME":
            return { ...state, theme: state.theme === "light" ? "dark" : "light" };
        default:
            return state;
    }
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return (
        <ThemeContext.Provider value={{ state, dispatch }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
