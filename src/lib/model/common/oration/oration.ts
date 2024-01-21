import type { Invitation } from "..";

export interface Oration {
  invitation?: Invitation;
  oremus: boolean;

  text: string;

  conclusion?: {
    text: string;
    silent: boolean;
  }
}
