export type contentDataType = { date: string };

export type partsType = { duration: string; theme: string };

export type AllSingType = string[];

export type contentParserReturnType = {
  info: {
    date: string;
    sings: AllSingType;
    biblicalBasis: string;
  };
  treasures: partsType[];
  yourself: partsType[];
  linving: partsType[];
};
