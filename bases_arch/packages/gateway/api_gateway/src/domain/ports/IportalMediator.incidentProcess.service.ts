export interface IportalMediatorIncidentProcessService {
  incident_process_get_list(token: string): Promise<any>;
  incident_process_get_detail(token: string, id: string): Promise<any>;
}
