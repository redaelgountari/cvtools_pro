"use client";

import { useEffect, useState } from "react";
import { ReadContext } from "./ReadContext";
import { getFromStorage, saveImageToStorage, saveSettings, saveToStorage } from "@/Cookiesmv";
import { Toaster } from "@/components/ui/toaster";

export default function ReadContextProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [settings, setSettings] = useState(null);
    const [AnlysedCV, setAnlysedCV] = useState(null);

    // Save analyzed CV to storage when it updates
    useEffect(() => {
        if (AnlysedCV) {
            saveToStorage("userData", AnlysedCV, 7);
        }
    }, [AnlysedCV]);

    // Load saved data from storage on mount
    useEffect(() => {
        const savedAnlysedCV = getFromStorage("userData");
        const savedSettings = getFromStorage("Settings");

        if (savedAnlysedCV) {
            setAnlysedCV(savedAnlysedCV);
        }
        if (savedSettings) {
            setSettings(savedSettings);
        }
    }, []);

    // Save user image to storage when userData updates
    useEffect(() => {
        if (userData?.image) {
            saveImageToStorage("userImage", userData.image, 7);
        }
    }, [userData]);

    // Save settings to storage when settings update
    useEffect(() => {
        if (settings) {
            saveSettings("Settings", settings, 7);
        }
    }, [settings]);

    return (
        <ReadContext.Provider value={{ userData, setUserData, AnlysedCV, setAnlysedCV, settings, setSettings }}>
            {children}
            <Toaster />
        </ReadContext.Provider>
    );
}
