"use client";

import Link from "next/link";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { startDemoSession } from "@/lib/demo-session";

export default function LoginPage() {
  const router = useRouter();
  const enter = () => { startDemoSession(); router.replace("/app"); };
  return <main className="login-page"><div className="login-shell"><Link href="/" className="login-brand"><img src="/images/playnest/b91dc68775b2.png" alt=""/> <span>PlayNest<small>Play. Learn. Grow.</small></span></Link><section className="login-card"><div className="login-icon"><LockKeyhole size={21}/></div><h1>Welcome back, Sarah</h1><p>Use the fictional parent account to explore the PlayNest booking demo. No password or real information is required.</p><button className="action button-action" onClick={enter}>Continue to the demo <ArrowRight size={17}/></button><Link href="/" className="back-login">Back to PlayNest</Link></section></div></main>;
}
