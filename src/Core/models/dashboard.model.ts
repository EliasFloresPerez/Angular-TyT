export interface ActivityByDay {
  date: string;
  count: number;
}

export interface DashboardData {
  totalOrders: number;
  completedOrders: number;
  pendingOrders: number;
  activeClients: number;
  activityByDay: ActivityByDay[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}