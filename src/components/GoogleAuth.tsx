"use client";
import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {supabase} from "../helper/supabaseClient.ts";
import { useNavigate } from "react-router-dom";
import {useRouter} from "next/navigation"

const GoogleAuth = () => {
    const router = useRouter()
    useEffect(() => {
        // Check for an existing session on mount
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                console.log(session);
                router.push("/dashboard");
            }
        };

        checkSession();

        // Listen for authentication state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                console.log(session);
                router.push("/dashboard");
                
            } else {
                router.push("/");
            }
        });

        return () => authListener?.subscription?.unsubscribe(); // Ensure safe cleanup
    }, []);

    return (
        <div>
            <Auth
                supabaseClient={supabase}
                providers={["google"]}
                socialLayout="horizontal"
                socialButtonSize="small"
                appearance={{ theme: ThemeSupa }}
            />
        </div>
    );
};

export default GoogleAuth;

