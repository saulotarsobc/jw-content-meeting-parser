import { AllSingType, contentParserReturnType, partsType } from "../types";

export const getSings = (ct: string): AllSingType => {
  return ct.split("\n").filter((line) => /Cântico\s\d+/.test(line));
};

export const getDate = (ct: string): string => {
  return ct.split("\n")[0];
};

export const getBiblicalBasis = (ct: string): string => {
  return ct.split("\n")[1];
};

export const getTreasuresInfo = (ct: string): partsType[] => {
  const start = ct.indexOf("TESOUROS DA PALAVRA DE DEUS");
  const end = ct.indexOf("FAÇA SEU MELHOR NO MINISTÉRIO");
  const section = ct.substring(start, end);
  const sectionS = section.split("\n");
  const parts = sectionS.filter((line: any) => /^.*:\s.*$/.test(line));

  return parts.map((line: string) => {
    if (line.startsWith("Leitura da")) {
      const lineS = line.split(/^(.*):\s\((\d+ \w+)\)\s(.*)\s\(.*\).*$/);
      return {
        duration: lineS[2],
        theme: lineS[1] + " - " + lineS[3],
      };
    } else {
      return {
        duration: line.split(/^(.*):\s\((\d+ \w+)\).*$/)[2],
        theme: line.split(/^(.*):\s\((\d+ \w+)\).*$/)[1],
      };
    }
  });
};

export const getOnlyApplyYourself = (ct: string): string => {
  const start = ct.indexOf("FAÇA SEU MELHOR NO MINISTÉRIO");
  const end = ct.indexOf("NOSSA VIDA CRISTÃ");
  return ct.substring(start, end);
};

export const getLivingInfo = (ct: string): partsType[] => {
  const start = ct.indexOf("NOSSA VIDA CRISTÃ");
  const section = ct.substring(start).split("\n");
  const parts = section.filter((line) => /\:\s\(/.test(line));

  return parts.map((line: string) => {
    return {
      duration: line.split(/^(.*)\:\s\((\d+\s\w+)\).*$/)[2],
      theme: line.split(/^(.*)\:\s\((\d+\s\w+)\).*$/)[1],
    };
  });
};

export const getApplyYoursenfInfo = (ct: string): partsType[] => {
  const applyYourself = getOnlyApplyYourself(ct);
  const applyYourselfS = applyYourself
    .split("\n")
    .filter((line) => /:\s/.test(line));
  return applyYourselfS.map((line: string) => {
    if (line.includes("Tema:") && line.includes("Discurso:")) {
      return {
        duration: line.split(/^(.*?):\s*\((\d+\s*\w+)\)/)[2],
        theme:
          line.split(/^(.*?):\s*\((\d+\s*\w+)\)/)[1] +
          " - " +
          line.split(/^.*\sTema:\s(.*)\s\(.*\)$/)[1],
      };
    } else {
      return {
        duration: line.split(/^(.*?):\s*\((\d+\s*\w+)\)/)[2],
        theme: line.split(/^(.*?):\s*\((\d+\s*\w+)\)/)[1],
      };
    }
  });
};

export const contentParser = (ct: string): contentParserReturnType => {
  return {
    info: {
      date: getDate(ct),
      sings: getSings(ct),
      biblicalBasis: getBiblicalBasis(ct),
    },
    treasures: getTreasuresInfo(ct),
    yourself: getApplyYoursenfInfo(ct),
    linving: getLivingInfo(ct),
  };
};
