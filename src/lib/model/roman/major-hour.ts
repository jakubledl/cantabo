import type { Commemoration, Preces } from ".";
import type { Invitation, ModeWithTermination, Oration, Psalm, PsalmGroup } from "../common";

export interface MajorHour {
  incipit?: {
    type: "ferial" | "festal" | "solemn",
    alleluja: boolean,
  };

  doubled: boolean;
  psalms: PsalmGroup[];

  chapter: string;
  hymn: string;
  verse: string;

  canticle: {
    antiphon: string;
    mode: ModeWithTermination;
    solemn: boolean;
    body: Psalm;
  };

  preces?: Preces;

  oration: Oration;

  commemorations: Commemoration[];

  conclusion?: {
    invitation: Invitation;
    benedicamus: string; // probably should be an enum later
  }
}
