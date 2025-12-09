export type SceneLabel = 'Buildings' | 'Forest' | 'Glacier' | 'Mountain' | 'Sea' | 'Street';

export interface ClassProbability {
  label: SceneLabel;
  probability: number;
}

export interface PredictionResult {
  topLabel: SceneLabel;
  confidence: number;
  allProbabilities: ClassProbability[];
}

export interface ApiError {
  message: string;
}