import { useMemo } from "react";
import Application from "../types/Application";
import { MaterialReactTable, MRT_Row, useMaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom";

interface Props {
  applicationsList: Application[],
}

const ApplicationListTable = ({applicationsList}: Props) => {

  const columns = useMemo(
    () => [
      {
        accessorKey: 'company', 
        header: 'Company',
        //Render as link
        Cell: ({ row }: {row: MRT_Row<Application>}) => (
          <Link to={`/application/${row.original.ID}`}>{row.original.company}</Link>
        ),
      },
      {
        accessorKey: 'position', 
        header: 'Position',
      },
      {
        accessorKey: 'technologies', 
        header: 'Technologies',
      },
      {
        accessorKey: 'dateApplied', 
        header: 'Applied at',
        accessorFn: (row: { dateApplied: string | number | Date; }) => new Date(row.dateApplied),
        Cell: ({ cell }: {cell: {getValue: () => Date}}) => cell?.getValue()?.toLocaleDateString(),
      },
      {
        accessorKey: 'dateUpdated', 
        header: 'Last Updated',
        accessorFn: (row: { dateUpdated: string | number | Date; }) => new Date(row.dateUpdated),
        Cell: ({ cell }: {cell: {getValue: () => Date}}) => cell?.getValue()?.toLocaleDateString(),
      },
      {
        accessorKey: 'status', 
        header: 'Status',
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: applicationsList,
    enableColumnOrdering: false, 
    enableRowSelection: false,
    enablePagination: true,
    enableDensityToggle: false,
    enableHiding: false,

  });
  return (  
    <MaterialReactTable table={table} />
  );
}
 
export default ApplicationListTable;