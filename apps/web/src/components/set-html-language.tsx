import { useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";

export function SetHtmlLang() {
    const { currentLanguage } = useLanguage();
    useEffect(() => {
        document.documentElement.lang = currentLanguage;
    }, [currentLanguage]);
    return null;
}