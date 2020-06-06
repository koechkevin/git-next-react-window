import { secs } from './sec';

interface Arguments {
  organisation: string;
  repo: string;
}
export const getDocs = async ({ organisation, repo }: Arguments): Promise<any[]> => {
  try {
    const { default: xmlRequest } = await import('axios');
    const { default: atob } = await import('atob');
    const response = await xmlRequest.get(`https://api.github.com/repos/${organisation}/${repo}/contents/docs`, {
      params: { ...secs },
    });
    if (response.data) {
      return response.data;
    }
    return [];
  } catch (error) {
    return [];
  }
};
