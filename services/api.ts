import { PredictionResult, SceneLabel } from '../types';

export const classifyImage = async (file: File): Promise<PredictionResult> => {
  const API_URL = 'https://ryanss05-scenedetectorbackend.hf.space/predict';

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server Error (${response.status}): ${errorText || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (!data.topLabel || !data.allProbabilities) {
      throw new Error("Invalid response format from server. Expected 'topLabel' and 'allProbabilities'.");
    }

    return data as PredictionResult;

  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error("Could not connect to the server. Is your Flask backend running on port 5000?");
    }
    throw error;
  }
};
