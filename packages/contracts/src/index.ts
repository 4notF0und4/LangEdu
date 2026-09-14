// Bu paket yalnız ortaq tiplər üçündür; import type ilə istifadə olunur.
export interface HealthResponse {
  status: 'ok';
  service: 'langedu-api';
  timestamp: string;
}
