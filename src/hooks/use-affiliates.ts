import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AffiliateResponse, affiliateService } from "@/services/afiiliate.service";
import { useState } from "react";

export const useAffiliates = () => {
    const [page, setPage] = useState<number>(1)

  const { isLoading, isError, data, isPending, error } = useQuery<AffiliateResponse>({
    queryKey: ['affiliates', page],
    queryFn: () => affiliateService.getAffiliate({ page }),
    placeholderData: keepPreviousData,
  });

  return {
    isLoading,
    isError,
    data,
    isPending,
    error,
    page,
    setPage,
  }
};
