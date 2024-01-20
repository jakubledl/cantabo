import type { ModeWithTermination } from "..";

export interface Psalm {
  title: string;
  mode: ModeWithTermination;
  firstLine: Syllable[];
  otherLines: string[];
}

interface Syllable {
  text: string;
  appendix: string;
  omitted?: true;
  type?: "accent" | "preparatory"
}
