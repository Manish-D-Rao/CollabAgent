"use client";

import { useEffect, useState } from "react";
import { checkBackendHealth } from "@/lib/api";
import { Activity, AlertCircle, LoaderCircle } from "lucide-react";

export default function BackendStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let mounted = true;

    async function checkConnection() {
      try {
        await checkBackendHealth();

        if (mounted) {
          setStatus("connected");
        }
      } catch {
        if (mounted) {
          setStatus("disconnected");
        }
      }
    }

    checkConnection();

    const interval = setInterval(checkConnection, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const config = {
    checking: {
      label: "Checking backend",
      dot: "bg-amber-400",
      icon: LoaderCircle,
    },
    connected: {
      label: "API connected",
      dot: "bg-emerald-400",
      icon: Activity,
    },
    disconnected: {
      label: "API disconnected",
      dot: "bg-red-400",
      icon: AlertCircle,
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <div
      className="flex items-center gap-2 text-xs text-slate-400"
      role="status"
      aria-live="polite"
    >
      <span className={`h-2 w-2 rounded-full ${current.dot}`} />
      <Icon size={14} className={status === "checking" ? "animate-spin" : ""} />
      <span>{current.label}</span>
    </div>
  );
}
