import { create } from "zustand";
import type { AnalysisData } from "@/types/analysis";

interface AnalysisState {
  resultData: AnalysisData | null;
  setResultData: (data: AnalysisData) => void;
  fileContents: Record<string, string>;
  setFileContents: (contents: Record<string, string>) => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  resultData: null,
  setResultData: (data) => set({ resultData: data }),
  fileContents: {},
  setFileContents: (contents) => set({ fileContents: contents }),
}));