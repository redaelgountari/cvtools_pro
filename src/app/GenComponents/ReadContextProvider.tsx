"use client";

import { useEffect, useState } from "react";
import { ReadContext } from "./ReadContext";
import { getFromStorage, saveImageToStorage, saveSettings, saveToStorage } from "@/Cookiesmv";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { SessionProvider, useSession } from "next-auth/react";

function ReadContextProviderInner({ children }) {
    const [userData, setUserData] = useState(null);
    const [userinfos, setUserinfos] = useState(null);
    const [settings, setSettings] = useState(null);
    const [AnlysedCV, setAnlysedCV] = useState(null);
    const { data: session } = useSession();

    useEffect(() => {
        const saveData = async () => {
            if (!AnlysedCV || !userinfos) return;
            
            saveToStorage("userData", AnlysedCV, 7);
            
            try {
                const res = await axios.post('/api/storeuserdata', { 
                    userData: AnlysedCV, 
                    userId: userinfos 
                });
                console.log("Data stored successfully:", res.data);
            } catch (err) {
                console.error("Error storing user data:", err);
            }
        };
        
        saveData();
    }, [AnlysedCV, userinfos]);

    useEffect(() => {
        const loadUserData = async () => {
            if (!userinfos) return;
            
            try {
                // First try to get from local storage
                const savedAnlysedCV = getFromStorage("userData");
                
                if (savedAnlysedCV) {
                    setAnlysedCV(savedAnlysedCV);
                } else {
                    // If not in storage, fetch from API
                    const userId = typeof userinfos === 'object' ? userinfos.id : userinfos;
                    const response = await axios.get(`/api/GettingUserData`, {
                        params: { userId }
                    });
                    
                    // Make sure we're setting the response data, not the entire response
                    setAnlysedCV(response.data);
                }
            } catch (err) {
                console.error("Error loading user data:", err);
            }
        };
        
        loadUserData();
    }, [userinfos]);

    useEffect(() => {
        const savedSettings = getFromStorage("Settings");
        if (savedSettings) {
            setSettings(savedSettings);
        }
    }, []);

    useEffect(() => {
        if (userData?.image) {
            saveImageToStorage("userImage", userData.image, 7);
        }
    }, [userData]);

    useEffect(() => {
        if (settings) {
            saveSettings("Settings", settings, 7);
        }
    }, [settings]);

    useEffect(() => {
        if (session?.user) {
            setUserinfos(session.user.id);
        }
    }, [session]);

    return (
        <ReadContext.Provider value={{ 
            userData, 
            setUserData, 
            AnlysedCV, 
            setAnlysedCV, 
            settings, 
            setSettings, 
            userinfos, 
            setUserinfos 
        }}>
            {children}
            <Toaster />
        </ReadContext.Provider>
    );
}

export default function ReadContextProvider({ children }) {
    return (
        <SessionProvider>
            <ReadContextProviderInner>
                {children}
            </ReadContextProviderInner>
        </SessionProvider>
    );
}