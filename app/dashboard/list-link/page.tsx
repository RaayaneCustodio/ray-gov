import { Sharing, columns } from "./links/columns"
import { DataTable } from "./links/data-table"

 
async function getData(): Promise<Sharing[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: 'Teste1',
      status: "compartilhou",
      email: "m@example.com",
    },
    {
      id: "128ed52f",
      name: 'Teste2',
      status: "pendente",
      email: "r@example.com",
    },
    {
      id: "128ed52x",
      name: 'Teste3',
      status: "compartilhou",
      email: "d@example.com",
    },
    // ...
  ]
}

export default async function ListLinkPage() {
    const data = await getData()

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}