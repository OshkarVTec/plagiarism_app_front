export interface ClonePair {
  file1: string;
  file2: string;
  clone_type: number;
}

export interface Cluster {
  members: Record<string, [number, number][]>;
  file_pairs: ClonePair[];
}

export interface AnalysisData {
  [clusterId: string]: Cluster;
}

export interface AnalysisState {
  resultData: AnalysisData | null;
  fileContents: Record<string, string>;
  setResultData: (data: AnalysisData) => void;
  setFileContents: (contents: Record<string, string>) => void;
}
