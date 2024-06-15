// columns.ts

import { ColumnDef } from "@tanstack/react-table";

export type Sharing = {
  id: string;
  name: string;
  status: string;
  email: string;
  postagem: string;
  timestamp: string;
  userId: string;
};

export const columns: ColumnDef<Sharing>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "postagem",
    header: "Postagem",
  },
  {
    accessorKey: "timestamp",
    header: "Timestamp",
  },
  {
    accessorKey: "userId",
    header: "User ID",
  },
];
