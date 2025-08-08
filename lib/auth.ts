import {signIn, signOut} from "@/auth";


export const login = async () => {
    "use server";
    await signIn("github", {redirectTo: "/"});
};

export const logout = async () => {
    "use server";
    await signOut({redirectTo: "/auth/signin"});
};