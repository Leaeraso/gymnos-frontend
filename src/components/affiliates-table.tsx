"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AffiliateState } from "./affiliate-state";
import { ArrowUpDown, Eye, Mars, Pencil, Trash, Venus } from "lucide-react";
import { Button } from "./ui/button";
import { useAffiliates } from "@/hooks/use-affiliates";
import { PaginationBuilder } from "./pagination-builder";
import { calculateTotalPages, normalizeDate, normalizeFullName } from "@/utils/pagination.utils";
import { Input } from "./ui/input";
import { AffiliateSex } from "@/types/affiliates.type";
import { AffiliateModal } from "./affiliate-modal";
import { useState } from "react";
import { GenderIcon } from "./gender-icon";

export function AffiliatesTable() {
  const { data, queryParams, setQueryParams, createAffiliateAsync, isCreating } = useAffiliates()
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const affiliates = data?.data ?? []
  const totalPages = calculateTotalPages(data?.paginate?.total!, data?.paginate?.pageSize)

  const handlePageChange = (page: number) => {
    setQueryParams({...queryParams, page})
  }
 
  return (
    <>
    <div className="overflow-x-auto w-full">
      <div className="flex items-center py-4 flex-row justify-between">
        <Input
          placeholder="Buscar afiliado..."
          className="max-w-sm"
        />
        <AffiliateModal createAffiliateAsync={createAffiliateAsync} isCreating={isCreating} isOpen={isOpen} setIsOpen={setIsOpen}/>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">N° afiliado</TableHead>
            <TableHead className="text-left">
              <Button
                variant="ghost"
                onClick={() => {}}
              >
                Nombre completo
                <ArrowUpDown className="w-4 h-4" />
              </Button>
            </TableHead>
            <TableHead className="text-left">Fecha Nacimiento</TableHead>
            <TableHead className="text-left">Documento</TableHead>
            <TableHead className="text-left">Estado</TableHead>
            <TableHead className="text-left">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {affiliates.map((affiliate) => (
              <TableRow key={affiliate.affiliate_number}>
                <TableCell className="text-left">{affiliate.affiliate_number}</TableCell>
                <TableCell className="text-left">
                  <div className="flex gap-x-1 flex-row justify-left">
                    <span>
                      <GenderIcon gender={affiliate.sex} />
                    </span>
                    <span>{normalizeFullName(affiliate.name, affiliate.last_name)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-left">{normalizeDate(affiliate.date_of_birth)}</TableCell>
                <TableCell className="text-left">{affiliate.dni}</TableCell>
                <TableCell className="text-left">
                  <AffiliateState state={affiliate.paid} />
                </TableCell>
                <TableCell className="flex gap-x-2 justify-start">
                  <Button variant="outline" size="icon" className="cursor-pointer">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="cursor-pointer">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="cursor-pointer">
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

      {
        affiliates.length > 0 && (
          <div className="mt-4">
            <PaginationBuilder page={queryParams.page} totalPages={totalPages} setPage={handlePageChange}/>
          </div>
        )
      }
    </> 
  );
}
