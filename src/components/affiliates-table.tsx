import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AffiliateState } from "./affiliate-state";
import { Mars, Venus } from "lucide-react";

const users = [
  {
    id: "6828f4d5d32cde4260a58e11",
    affiliate_number: 6,
    name: "Valentina",
    last_name: "Rojas",
    date_of_birth: "1988-02-28T00:00:00.000Z",
    dni: 67890123,
    sex: "Woman",
    created_at: "2025-05-17T20:43:01.060Z",
    updated_at: "2025-05-17T20:43:01.060Z",
    paid: false,
    __v: 0,
  },
  {
    id: "6828f4c5d32cde4260a58e01",
    affiliate_number: 4,
    name: "Sofía",
    last_name: "López",
    date_of_birth: "2000-09-30T00:00:00.000Z",
    dni: 45678901,
    sex: "Woman",
    created_at: "2025-05-17T20:42:45.025Z",
    updated_at: "2025-05-17T20:42:45.025Z",
    paid: true,
    __v: 0,
  },
  {
    id: "6828f4bcd32cde4260a58df9",
    affiliate_number: 3,
    name: "Miguel",
    last_name: "Gómez",
    date_of_birth: "1978-03-15T00:00:00.000Z",
    dni: 34567890,
    sex: "Man",
    created_at: "2025-05-17T20:42:36.581Z",
    updated_at: "2025-05-17T20:42:36.581Z",
    paid: false,
    __v: 0,
  },
  {
    id: "6828f4f2d32cde4260a58e31",
    affiliate_number: 10,
    name: "Mariana",
    last_name: "Vega",
    date_of_birth: "1998-04-05T00:00:00.000Z",
    dni: 12345098,
    sex: "Woman",
    created_at: "2025-05-17T20:43:30.275Z",
    updated_at: "2025-05-17T20:43:30.275Z",
    paid: true,
    __v: 0,
  },
  {
    id: "6828f4b4d32cde4260a58df1",
    affiliate_number: 2,
    name: "Laura",
    last_name: "Fernández",
    date_of_birth: "1990-11-23T00:00:00.000Z",
    dni: 23456789,
    sex: "Woman",
    created_at: "2025-05-17T20:42:28.752Z",
    updated_at: "2025-05-17T20:42:28.752Z",
    paid: true,
    __v: 0,
  },
  {
    id: "6828f4ddd32cde4260a58e19",
    affiliate_number: 7,
    name: "Javier",
    last_name: "Pérez",
    date_of_birth: "1975-12-01T00:00:00.000Z",
    dni: 78901234,
    sex: "Man",
    created_at: "2025-05-17T20:43:09.419Z",
    updated_at: "2025-05-17T20:43:09.419Z",
    paid: false,
    __v: 0,
  },
  {
    id: "6828f4ced32cde4260a58e09",
    affiliate_number: 5,
    name: "Diego",
    last_name: "Martínez",
    date_of_birth: "1995-05-10T00:00:00.000Z",
    dni: 56789012,
    sex: "Man",
    created_at: "2025-05-17T20:42:54.060Z",
    updated_at: "2025-05-17T20:42:54.060Z",
    paid: true,
    __v: 0,
  },
  {
    id: "6828f4a7d32cde4260a58de9",
    affiliate_number: 1,
    name: "Carlos",
    last_name: "Ramírez",
    date_of_birth: "1985-07-12T00:00:00.000Z",
    dni: 12345678,
    sex: "Man",
    created_at: "2025-05-17T20:42:15.825Z",
    updated_at: "2025-05-17T20:42:15.825Z",
    paid: false,
    __v: 0,
  },
  {
    id: "6828f4e5d32cde4260a58e21",
    affiliate_number: 8,
    name: "Camila",
    last_name: "Sánchez",
    date_of_birth: "1993-06-18T00:00:00.000Z",
    dni: 89012345,
    sex: "Woman",
    created_at: "2025-05-17T20:43:17.602Z",
    updated_at: "2025-05-17T20:43:17.602Z",
    paid: false,
    __v: 0,
  },
  {
    id: "6828f4ead32cde4260a58e29",
    affiliate_number: 9,
    name: "Andrés",
    last_name: "Torres",
    date_of_birth: "1982-08-25T00:00:00.000Z",
    dni: 90123456,
    sex: "Man",
    created_at: "2025-05-17T20:43:22.914Z",
    updated_at: "2025-05-17T20:43:22.914Z",
    paid: true,
    __v: 0,
  },
];

export function AffiliatesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>N° afiliado</TableHead>
          <TableHead>Nombre completo</TableHead>
          <TableHead>Fecha Nacimiento</TableHead>
          <TableHead>Documento</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const normalizedDob = user.date_of_birth
            .slice(0, 10)
            .replace(/-/g, "/");

          return (
            <TableRow key={user.affiliate_number}>
              <TableCell>{user.affiliate_number}</TableCell>
              <TableCell>
                <div className="flex gap-x-1 flex-row">
                  <span>
                    {user.sex === "Woman" ? (
                      <Venus className="w-5 h-5" />
                    ) : (
                      <Mars className="w-5 h-5" />
                    )}
                  </span>
                  <span>{user.name + " " + user.last_name}</span>
                </div>
              </TableCell>
              <TableCell>{normalizedDob}</TableCell>
              <TableCell>{user.dni}</TableCell>
              <TableCell>
                <AffiliateState state={user.paid} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
