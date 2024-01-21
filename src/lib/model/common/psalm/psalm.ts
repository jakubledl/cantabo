import type { ModeWithTermination } from "..";

export interface Psalm {
  title: string;
  mode: ModeWithTermination;
  firstLine: Syllable[];
  otherLines: string[];
}

export interface Syllable {
  text: string;
  follow: string;
  omitted: boolean;
  type?: "accent" | "preparatory"
}

export interface PsalmGroup {
  antiphon?: string;
  psalms: Psalm[];
}
