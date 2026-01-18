import commonAPI from "./CommonAPI";
import serverURL from "./ServerURL";

// Upload CSV
export const uploadCSVAPI = async (data) => {
  return await commonAPI("POST", `${serverURL}/upload`, data);
};

// Get table data
export const getTableDataAPI = async (id) => {
  return await commonAPI("GET", `${serverURL}/dataset/${id}/table`);
};

// Get stats
export const getColumnStatsAPI = async (id, column) => {
  return await commonAPI(
    "GET",
    `${serverURL}/dataset/${id}/column/${column}/stats`
  );
};

// Get histogram
export const getHistogramAPI = async (id, column) => {
  return await commonAPI(
    "GET",
    `${serverURL}/dataset/${id}/column/${column}/hist`
  );
};
