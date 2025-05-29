export interface FussballData {
  currentSaison: string;
  defaultCompetitionType: string;
  Mandanten: {
    [key: string]: string;
  };
  Saisons: {
    [mandantKey: string]: {
      [saisonKey: string]: string;
    };
  };
  CompetitionTypes: {
    [mandantKey: string]: {
      [saisonKey: string]: {
        [competitionTypeKey: string]: string;
      };
    };
  };
}

export interface FussballKindsData {
  Mannschaftsart: {
    [key: string]: string;
  };
  Spielklasse: {
    [mannschaftsartKey: string]: {
      [spielklasseKey: string]: string;
    };
  };
  Gebiet: {
    [mannschaftsartKey: string]: {
      [spielklasseKey: string]: {
        [gebietKey: string]: string;
      };
    };
  };
}

export interface FussballCompetitionsData {
  [spielklasseKey: string]: {
    [gebietKey: string]: {
      [competitionUrl: string]: string;
    };
  };
} 