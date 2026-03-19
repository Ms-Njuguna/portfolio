"use client";

import * as React from "react";
import { RadialIntro } from "../components/animate-ui/components/community/radial-intro";

const ITEMS = [
  { id: 1, name: "React", src: "https://avatars.githubusercontent.com/u/6412038?s=200&v=4" },
  { id: 2, name: "Django", src: "https://avatars.githubusercontent.com/u/27804?s=200&v=4" },
  { id: 3, name: "Postgres", src: "https://avatars.githubusercontent.com/u/177543?s=200&v=4" },
  { id: 4, name: "Tailwind", src: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4" },
  { id: 5, name: "Vite", src: "https://avatars.githubusercontent.com/u/65625612?s=200&v=4" },
  { id: 6, name: "Git", src: "https://avatars.githubusercontent.com/u/18133?s=200&v=4" },
  { id: 7, name: "Node", src: "https://avatars.githubusercontent.com/u/9950313?s=200&v=4" },
  { id: 8, name: "JS", src: "https://avatars.githubusercontent.com/u/14600596?s=200&v=4" },
];

export const RadialIntroDemo = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="text-sm font-medium opacity-80">Tech orbit</div>
    <RadialIntro orbitItems={ITEMS} stageSize={340} imageSize={58} />
    <div className="text-xs opacity-60">A tiny flex: motion + clean layout.</div>
  </div>
);