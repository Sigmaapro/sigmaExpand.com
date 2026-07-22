import type { ServiceComparisonTable as ServiceComparisonTableData } from "@/content/services";

type ServiceComparisonTableProps = {
  table: ServiceComparisonTableData;
};

function formatCell(value: string | boolean): string {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value;
}

export function ServiceComparisonTable({ table }: ServiceComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#07090f]/55 [-webkit-overflow-scrolling:touch]">
      <table className="min-w-[36rem] w-full border-collapse text-left text-sm">
        <caption className="sr-only">{table.title}</caption>
        <thead>
          <tr className="border-b border-white/[0.08]">
            <th
              scope="col"
              className="px-4 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[#93C5FD] sm:px-5"
            >
              Feature
            </th>
            {table.columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className="px-4 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[#93C5FD] sm:px-5"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.id} className="border-b border-white/[0.06] last:border-b-0">
              <th
                scope="row"
                className="px-4 py-3.5 align-top font-medium text-white sm:px-5"
              >
                {row.feature}
              </th>
              {table.columns.map((column) => (
                <td key={column.id} className="px-4 py-3.5 align-top text-[#b6bcc4] sm:px-5">
                  {formatCell(row.cells[column.id] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
