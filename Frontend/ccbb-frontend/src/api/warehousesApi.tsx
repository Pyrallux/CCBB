import axios from "axios";

interface Warehouse {
  warehouse_id?: number;
  name: string;
  manual?: boolean;
  path?: string;
  abc_code_path?: string;
  cycles_per_year?: number;
}

const warehousesApi = axios.create({
  baseURL: "http://balls.webhop.me:8000",
});

export const getWarehouses = async () => {
  const response = await warehousesApi.get("/warehouses/");
  return response.data;
};

export const getWarehouseDetail = async (warehouse_id: number) => {
  const response = await warehousesApi.get(`/warehouses/${warehouse_id}`);
  return response.data;
};

export const addWarehouse = async (warehouse: Warehouse) => {
  return await warehousesApi.post("/warehouses/", warehouse);
};

export const updateWarehouse = async (warehouse: Warehouse) => {
  return await warehousesApi.put(
    `/warehouses/${warehouse.warehouse_id}`,
    warehouse
  );
};

export const deleteWarehouse = async ({ warehouse_id }: Warehouse) => {
  return await warehousesApi.delete(`/warehouses/${warehouse_id}`);
};

export default warehousesApi;
