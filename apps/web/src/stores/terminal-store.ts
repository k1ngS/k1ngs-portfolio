import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

// Terminal entry interface
export interface TerminalEntry {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: string;
  timestamp: Date;
  command?: string;
}

// Available terminal themes
export type TerminalTheme = "matrix" | "cyberpunk" | "hacker" | "retro" | "professional";

// Terminal state interface
interface TerminalState {
  // Core state
  entries: TerminalEntry[];
  currentInput: string;
  theme: TerminalTheme;
  isLoading: boolean;
  
  // History for command navigation
  history: string[];
  historyIndex: number;
  
  // Actions
  addEntry: (entry: Omit<TerminalEntry, "id" | "timestamp">) => void;
  setCurrentInput: (input: string) => void;
  setTheme: (theme: TerminalTheme) => void;
  setLoading: (loading: boolean) => void;
  clearEntries: () => void;
  executeCommand: (command: string) => void;
  navigateHistory: (direction: "up" | "down") => void;
  addToHistory: (command: string) => void;
}

// Welcome message
const WELCOME_MESSAGE = {
  id: "welcome",
  type: "system" as const,
  content: `Welcome to K1ngs Terminal Portfolio v3.0

Type 'help' to see available commands.
Use arrow keys (↑/↓) to navigate command history.
Type 'theme <name>' to change themes: matrix, cyberpunk, hacker, retro, professional

> Ready for input...`,
  timestamp: new Date(),
};

// Create the terminal store with persistence
export const useTerminalStore = create<TerminalState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        entries: [WELCOME_MESSAGE],
        currentInput: "",
        theme: "matrix",
        isLoading: false,
        history: [],
        historyIndex: -1,

        // Actions
        addEntry: (entry) => {
          const newEntry: TerminalEntry = {
            ...entry,
            id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
          };

          set((state) => ({
            entries: [...state.entries, newEntry],
          }));
        },

        setCurrentInput: (input) => {
          set({ currentInput: input });
        },

        setTheme: (theme) => {
          set({ theme });
          
          // Add system message about theme change
          const themeEntry: TerminalEntry = {
            id: `theme-${Date.now()}`,
            type: "system",
            content: `Theme changed to: ${theme}`,
            timestamp: new Date(),
          };
          
          set((state) => ({
            entries: [...state.entries, themeEntry],
          }));
        },

        setLoading: (isLoading) => {
          set({ isLoading });
        },

        clearEntries: () => {
          set({
            entries: [WELCOME_MESSAGE],
          });
        },

        addToHistory: (command) => {
          const trimmed = command.trim();
          if (trimmed && trimmed.length > 0) {
            set((state) => ({
              history: [trimmed, ...state.history.filter(cmd => cmd !== trimmed)].slice(0, 100), // Keep last 100 commands
              historyIndex: -1,
            }));
          }
        },

        navigateHistory: (direction) => {
          const { history, historyIndex } = get();
          
          if (history.length === 0) return;
          
          let newIndex: number;
          
          if (direction === "up") {
            newIndex = historyIndex + 1;
            if (newIndex >= history.length) {
              newIndex = history.length - 1;
            }
          } else {
            newIndex = historyIndex - 1;
            if (newIndex < -1) {
              newIndex = -1;
            }
          }
          
          const command = newIndex === -1 ? "" : history[newIndex];
          
          set({
            historyIndex: newIndex,
            currentInput: command,
          });
        },

        executeCommand: (command) => {
          const { addEntry, addToHistory, setCurrentInput } = get();
          
          // Add input to entries
          addEntry({
            type: "input",
            content: `> ${command}`,
            command,
          });

          // Add to history
          addToHistory(command);
          
          // Clear current input
          setCurrentInput("");
          
          // Reset history index
          set({ historyIndex: -1 });

          // Note: Actual command processing will be handled by the command processor
          // This is just the store action for executing commands
        },
      }),
      {
        name: "k1ngs-terminal-storage", // Storage key
        storage: createJSONStorage(() => localStorage), // Use localStorage
        partialize: (state) => ({
          // Only persist certain parts of the state
          theme: state.theme,
          history: state.history,
          // Don't persist entries to avoid clutter - they'll be reset on reload
        }),
      }
    ),
    {
      name: "terminal-store", // DevTools name
    }
  )
);

// Export helper hooks for common operations
export const useTerminalTheme = () => useTerminalStore((state) => state.theme);
export const useTerminalEntries = () => useTerminalStore((state) => state.entries);
export const useTerminalInput = () => useTerminalStore((state) => state.currentInput);
export const useTerminalLoading = () => useTerminalStore((state) => state.isLoading);
export const useTerminalHistory = () => useTerminalStore((state) => state.history);