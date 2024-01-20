import type { ModeWithTermination, Psalm } from ".";

export interface Repository {
  getPsalm(id: string, mode: ModeWithTermination): Promise<Psalm | undefined>;
  getGloriaPatri(mode: ModeWithTermination): Promise<string[] | undefined>;
  getRequiemAeternam(mode: ModeWithTermination): Promise<string[] | undefined>;
}

export class RemoteRepository implements Repository {
  constructor(private fetcher: typeof fetch, private repositoryUrl: string) {}

  async getPsalm(id: string, mode: ModeWithTermination): Promise<Psalm | undefined> {
    try {
      return await this.getJson<Psalm>(
        `${this.repositoryUrl}/psalms/${id}-${this.processMode(mode)}`
      );
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  async getGloriaPatri(mode: ModeWithTermination): Promise<string[] | undefined> {
    try {
      return await this.getJson<string[]>(
        `${this.repositoryUrl}/gloria-patri/${this.processMode(mode)}`
      );
    } catch {
      return undefined;
    }
  }

  async getRequiemAeternam(mode: ModeWithTermination): Promise<string[] | undefined> {
    try {
      return await this.getJson<string[]>(
        `${this.repositoryUrl}/requiem-aeternam/${this.processMode(mode)}`
      );
    } catch {
      return undefined;
    }
  }

  private processMode(mode: ModeWithTermination): string {
    switch (mode) {
    case "1d2":
      return mode;
    case "3a2":
    case "3g":
      return "3term2";
    case "3g2":
      return "3term3";
    case "4e":
      return mode;
    case "4a":
    case "4as":
      return "4a";
    case "pereg":
      return mode;
    default:
      return mode.substring(0, 1);
    }
  }

  private async getJson<T>(url: string): Promise<T> {
    return (await this.fetcher(url + ".json")).json();
  }
}
