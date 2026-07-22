import type { ServiceDataTable as ServiceDataTableModel } from "@/content/services";

type ServiceDataTableProps = {
  table: ServiceDataTableModel;
};

const ALIGN: Record<"start" | "center" | "end", string> = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
};

export function ServiceDataTable({ table }: ServiceDataTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#07090f]/55 [-webkit-overflow-scrolling:touch]">
      <table className="min-w-[40rem] w-full border-collapse text-left text-sm">
        <caption className="sr-only">{table.title}</caption>
        <thead>
          <tr className="border-b border-white/[0.08]">
            {table.columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={`px-4 py-3 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-[#93C5FD] sm:px-5 ${ALIGN[column.align ?? "start"]}`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.id} className="border-b border-white/[0.06] last:border-b-0">
              {table.columns.map((column, index) => {
                const value = row.cells[column.id] ?? "—";
                const align = ALIGN[column.align ?? "start"];
                if (index === 0) {
                  return (
                    <th
                      key={column.id}
                      scope="row"
                      className={`px-4 py-3.5 align-top font-medium text-white sm:px-5 ${align}`}
                    >
                      {value}
                    </th>
                  );
                }
                return (
                  <td
                    key={column.id}
                    className={`px-4 py-3.5 align-top text-[#b6bcc4] sm:px-5 ${align}`}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
