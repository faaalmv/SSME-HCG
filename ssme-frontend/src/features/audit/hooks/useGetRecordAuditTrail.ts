import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../lib/axios';
import { AuditLogResponse } from '../../../types/api';

const fetchAuditTrail = async (recordId: string): Promise<AuditLogResponse[]> => {
  const { data } = await apiClient.get(`/api/records/${recordId}/audit`);
  return data;
};

export const useGetRecordAuditTrail = (recordId: string) => {
  return useQuery({
    queryKey: ['auditTrail', recordId],
    queryFn: () => fetchAuditTrail(recordId),
    enabled: !!recordId,
  });
};