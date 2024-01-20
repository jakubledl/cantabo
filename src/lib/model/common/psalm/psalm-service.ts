import type { Ending, ModeWithTermination, Psalm } from "..";
import type { Repository } from "../repository";

export interface PsalmService {
  /**
   * Retrieves a psalm.
   *
   * @param id ID of the psalm.
   * @param mode Mode (with termination) of the psalm.
   * @param ending Ending ("Gloria Patri" if not given).
   * @param antiphonText Text of the antiphon, to potentially omit in the first verse.
   */
  getPsalm(
    id: string,
    mode: ModeWithTermination,
    ending: Ending,
    antiphonText?: string
  ): Promise<Psalm | undefined>;
}

export class RepositoryPsalmService implements PsalmService {
  constructor(private repository: Repository) {}

  async getPsalm(
    id: string,
    mode: ModeWithTermination,
    ending: Ending,
    antiphonText?: string
  ): Promise<Psalm | undefined> {
    const psalm = await this.repository.getPsalm(id, mode);

    if (!psalm) {
      return undefined;
    }

    let endingLines: string[] | undefined = [];

    if (ending === "gloria") {
      endingLines = await this.repository.getGloriaPatri(mode);
    } else if (ending === "requiem") {
      endingLines = await this.repository.getRequiemAeternam(mode);
    }

    if (endingLines === undefined) {
      return undefined;
    }

    psalm.otherLines.push(...endingLines);

    if (antiphonText) {
      this.markOmittedWords(psalm, antiphonText);
    }

    return psalm;
  }

  private markOmittedWords(psalm: Psalm, antiphonText: string): void {
    const antiphonWords = antiphonText.split(" ");
    let omit = true;

    for (let i = 0; i < antiphonWords.length; i++) {
      if (!this.equivalentWords(antiphonWords[i], psalm.firstLine[i].text)) {
        omit = false;
      }
    }

    if (omit) {
      for (let i = 0; i < antiphonWords.length; i++) {
        psalm.firstLine[i].omitted = true;
      }
    }
  }

  private equivalentWords(word1: string, word2: string): boolean {
    return word1.localeCompare(word2, "fr", { sensitivity: "base" }) === 0;
  }
}
