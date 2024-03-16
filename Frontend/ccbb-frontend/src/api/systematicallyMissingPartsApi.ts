import axios from "axios";

interface SystematicallyMissingPart {
  systematically_missing_part_id?: number,
  number: string,
  quantity: number,
  date: Date | string,
  bin_id: number,
}

const systematicallyMissingPartsApi = axios.create({
  baseURL: "http://localhost:8000",
});

export const getSystematicallyMissingParts = async () => {
  const response = await systematicallyMissingPartsApi.get("/systematically_missing_parts/");
  return response.data;
};

export const getSystematicallyMissingPartDetail = async (systematically_missing_part_id: number) => {
  const response = await systematicallyMissingPartsApi.get(`/systematically_missing_parts/${systematically_missing_part_id}`);
  return response.data;
};

export const getSystematicallyMissingPartParent = async (parent_id: number) => {
  const response = await systematicallyMissingPartsApi.get(`/systematically_missing_parts/parent/${parent_id}`);
  return response.data;
};

export const addSystematicallyMissingPart = async (systematically_missing_part: SystematicallyMissingPart) => {
  return await systematicallyMissingPartsApi.post("/systematically_missing_parts/", systematically_missing_part);
};

export const updateSystematicallyMissingPart = async (systematically_missing_part: SystematicallyMissingPart) => {
  return await systematicallyMissingPartsApi.put(
    `/systematically_missing_parts/${systematically_missing_part.systematically_missing_part_id}`,
    systematically_missing_part
  );
};

export const deleteSystematicallyMissingPart = async (systematically_missing_part_id: number) => {
  return await systematicallyMissingPartsApi.delete(`/systematically_missing_parts/${systematically_missing_part_id}`);
};

export default systematicallyMissingPartsApi;
