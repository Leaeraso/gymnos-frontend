import { keepPreviousData, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AffiliateResponse, affiliateService } from "@/services/afiiliate.service";
import { useCallback, useState } from "react";
import { QueryParams } from "@/types/queryParams.type";
import { AffiliateInputForm, Affiliate } from "@/types/affiliates.type";

export const useAffiliates = () => {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        page: 1,
        page_size: 10,
        search: '',
        sort: 'id',
        sort_dir: 'DESC'
    })
    const queryClient = useQueryClient();

    const queryFn = useCallback(() => affiliateService.getAffiliate(queryParams), [queryParams])
    const { isLoading, isFetching, isError, data, isPending, error } = useQuery<AffiliateResponse>({
        queryKey: ['affiliates', queryParams],
        queryFn,
        placeholderData: keepPreviousData,
    });

    // Mutación para crear afiliado
    const handleCreateAffiliate = useMutation({
        mutationFn: (data: AffiliateInputForm) => affiliateService.createAffiliate(data),
        onSuccess: () => {
            // Invalidar y refetch la lista de afiliados
            queryClient.invalidateQueries({ queryKey: ['affiliates'] });
        },
        onError: (error) => {
            console.error('Error al crear afiliado:', error);
        }
    });

    // // Mutación para actualizar afiliado
    // const updateAffiliateMutation = useMutation({
    //     mutationFn: ({ id, data }: { id: string; data: AffiliateInputForm }) => 
    //         affiliateService.updateAffiliate(id, data),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['affiliates'] });
    //     },
    //     onError: (error) => {
    //         console.error('Error al actualizar afiliado:', error);
    //     }
    // });

    // // Mutación para eliminar afiliado
    // const deleteAffiliateMutation = useMutation({
    //     mutationFn: (id: string) => affiliateService.deleteAffiliate(id),
    //     onSuccess: () => {
    //         queryClient.invalidateQueries({ queryKey: ['affiliates'] });
    //     },
    //     onError: (error) => {
    //         console.error('Error al eliminar afiliado:', error);
    //     }
    // });

    return {
        // Query data
        isLoading,
        isFetching,
        isError,
        data,
        isPending,
        error,
        queryParams,
        setQueryParams,
        
        // Mutations
        createAffiliate: handleCreateAffiliate.mutate,
        createAffiliateAsync: handleCreateAffiliate.mutateAsync,
        isCreating: handleCreateAffiliate.isPending,
        createError: handleCreateAffiliate.error,
        
        // updateAffiliate: updateAffiliateMutation.mutate,
        // updateAffiliateAsync: updateAffiliateMutation.mutateAsync,
        // isUpdating: updateAffiliateMutation.isPending,
        // updateError: updateAffiliateMutation.error,
        
        // deleteAffiliate: deleteAffiliateMutation.mutate,
        // deleteAffiliateAsync: deleteAffiliateMutation.mutateAsync,
        // isDeleting: deleteAffiliateMutation.isPending,
        // deleteError: deleteAffiliateMutation.error,
    }
};
