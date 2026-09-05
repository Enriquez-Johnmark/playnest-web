const sessionKey = "playnest-web-demo-session";

export const isDemoSignedIn = () => localStorage.getItem(sessionKey) === "Sarah Reyes";
export const startDemoSession = () => localStorage.setItem(sessionKey, "Sarah Reyes");
export const endDemoSession = () => localStorage.removeItem(sessionKey);
