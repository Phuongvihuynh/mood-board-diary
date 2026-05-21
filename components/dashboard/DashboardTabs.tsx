"use client";

import { motion } from "framer-motion";

export type DashboardTab = "boards" | "cards";

interface DashboardTabsProps {
  active: DashboardTab;
  onChange: (tab: DashboardTab) => void;
}

export function DashboardTabs({ active, onChange }: DashboardTabsProps) {
  return (
    <div className="flex gap-1 bg-white/40 rounded-xl p-1">
      {(["boards", "cards"] as const).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative px-5 py-1.5 rounded-lg text-sm font-patrick-hand transition-colors cursor-pointer ${
            active === tab
              ? "text-foreground"
              : "text-soft-brown hover:text-foreground/70"
          }`}
        >
          {active === tab && (
            <motion.div
              layoutId="dashboard-tab"
              className="absolute inset-0 bg-white/70 rounded-lg shadow-sm"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            />
          )}
          <span className="relative z-10">
            {tab === "boards" ? "Boards" : "Cards"}
          </span>
        </button>
      ))}
    </div>
  );
}
