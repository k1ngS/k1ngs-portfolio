import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTerminalStore, useTerminalTheme, type TerminalEntry } from "@/stores/terminal-store";
import { processCommand, extractThemeFromCommand, type CommandResult } from "@/lib/command-processor";

// Theme configurations
const THEMES = {
  matrix: {
    bg: "bg-black",
    primary: "text-green-400",
    secondary: "text-green-300",
    accent: "text-green-500",
    cursor: "bg-green-400",
    scrollbar: "scrollbar-green",
  },
  cyberpunk: {
    bg: "bg-gray-900",
    primary: "text-cyan-400",
    secondary: "text-purple-400",
    accent: "text-pink-500",
    cursor: "bg-cyan-400",
    scrollbar: "scrollbar-cyan",
  },
  hacker: {
    bg: "bg-black",
    primary: "text-red-500",
    secondary: "text-orange-400",
    accent: "text-yellow-500",
    cursor: "bg-red-500",
    scrollbar: "scrollbar-red",
  },
  retro: {
    bg: "bg-amber-900",
    primary: "text-amber-200",
    secondary: "text-amber-300",
    accent: "text-amber-100",
    cursor: "bg-amber-200",
    scrollbar: "scrollbar-amber",
  },
  professional: {
    bg: "bg-gray-800",
    primary: "text-gray-100",
    secondary: "text-gray-300",
    accent: "text-blue-400",
    cursor: "bg-gray-100",
    scrollbar: "scrollbar-gray",
  },
};

interface TerminalProps {
  className?: string;
}

const Terminal: React.FC<TerminalProps> = ({ className = "" }) => {
  const {
    entries,
    currentInput,
    isLoading,
    addEntry,
    setCurrentInput,
    setTheme,
    setLoading,
    clearEntries,
    executeCommand,
    navigateHistory,
  } = useTerminalStore();
  
  const theme = useTerminalTheme();
  const themeConfig = THEMES[theme];
  
  const [isClient, setIsClient] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const entriesEndRef = useRef<HTMLDivElement>(null);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-focus input and scroll to bottom
  useEffect(() => {
    if (isClient && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isClient, entries]);

  // Scroll to bottom when new entries are added
  useEffect(() => {
    if (entriesEndRef.current) {
      entriesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [entries]);

  // Handle command processing
  const processCommand = useCallback(async (command: string): Promise<void> => {
    const trimmedCommand = command.trim();
    
    if (!trimmedCommand) return;

    setLoading(true);

    try {
      // Handle special commands that affect the terminal directly
      if (trimmedCommand.toLowerCase() === "clear") {
        clearEntries();
        setLoading(false);
        return;
      }

      // Handle theme changes
      const newTheme = extractThemeFromCommand(trimmedCommand);
      if (newTheme) {
        setTheme(newTheme);
        setLoading(false);
        return;
      }

      // Process other commands
      const results: CommandResult[] = await processCommand(trimmedCommand);
      
      // Add results to terminal
      for (const result of results) {
        addEntry({
          type: result.type,
          content: result.content,
        });
      }

    } catch (error) {
      console.error("Command processing failed:", error);
      addEntry({
        type: "error",
        content: `Command failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      });
    } finally {
      setLoading(false);
    }
  }, [addEntry, clearEntries, setTheme, setLoading]);

  // Handle input submission
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    const command = currentInput.trim();
    if (command) {
      executeCommand(command);
      processCommand(command);
    } else {
      // Add empty prompt
      addEntry({
        type: "input",
        content: "> ",
      });
    }
  }, [currentInput, isLoading, executeCommand, processCommand, addEntry]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        navigateHistory("up");
        break;
      case "ArrowDown":
        e.preventDefault();
        navigateHistory("down");
        break;
      case "Tab":
        e.preventDefault();
        // TODO: Implement autocomplete
        break;
      case "l":
        if (e.ctrlKey) {
          e.preventDefault();
          clearEntries();
        }
        break;
    }
  }, [navigateHistory, clearEntries]);

  // Handle click to focus input
  const handleTerminalClick = useCallback(() => {
    if (inputRef.current && !window.getSelection()?.toString()) {
      inputRef.current.focus();
    }
  }, []);

  // Render terminal entry
  const renderEntry = useCallback((entry: TerminalEntry, index: number) => {
    const getEntryColor = (type: TerminalEntry["type"]) => {
      switch (type) {
        case "input":
          return themeConfig.primary;
        case "output":
          return themeConfig.secondary;
        case "error":
          return "text-red-400";
        case "system":
          return themeConfig.accent;
        default:
          return themeConfig.primary;
      }
    };

    return (
      <motion.div
        key={entry.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`mb-1 whitespace-pre-wrap ${getEntryColor(entry.type)}`}
      >
        {entry.content}
      </motion.div>
    );
  }, [themeConfig]);

  if (!isClient) {
    return (
      <div className={`min-h-screen ${themeConfig.bg} font-mono flex items-center justify-center`}>
        <div className={themeConfig.primary}>Loading terminal...</div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen ${themeConfig.bg} font-mono ${themeConfig.primary} ${className}`}
      onClick={handleTerminalClick}
    >
      {/* Terminal Window */}
      <div className="min-h-screen flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="text-sm text-gray-300">
            K1ngs Terminal - {theme}
          </div>
          <div className="text-sm text-gray-400">
            {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="flex-1 overflow-auto p-4 pb-20"
          style={{ 
            scrollbarWidth: "thin",
            scrollbarColor: `currentColor transparent` 
          }}
        >
          {/* Terminal Entries */}
          <div className="space-y-0">
            <AnimatePresence initial={false}>
              {entries.map((entry, index) => renderEntry(entry, index))}
            </AnimatePresence>
            
            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${themeConfig.accent} flex items-center space-x-2`}
              >
                <div className="animate-spin">⟳</div>
                <span>Processing...</span>
              </motion.div>
            )}
          </div>

          {/* Scroll anchor */}
          <div ref={entriesEndRef} />
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-700 bg-gray-900 bg-opacity-95 backdrop-blur-sm">
          <div className="p-4">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <span className={themeConfig.accent}>❯</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`flex-1 bg-transparent outline-none ${themeConfig.primary} placeholder-gray-500`}
                placeholder="Type a command... (try 'help')"
                disabled={isLoading}
                autoComplete="off"
                spellCheck={false}
              />
              {/* Cursor */}
              <span className={`w-2 h-5 ${themeConfig.cursor} animate-pulse`}>█</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;