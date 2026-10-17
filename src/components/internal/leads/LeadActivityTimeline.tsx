import { activityClock, activityDayLabel } from "@/lib/internal/leads/format";
import type { LeadActivity } from "@/lib/internal/leads/types";

export function LeadActivityTimeline({ activities }: { activities: LeadActivity[] }) {
  if (activities.length === 0) {
    return <p className="text-[14px] text-cadet">No activity yet.</p>;
  }

  const groups: { day: string; items: LeadActivity[] }[] = [];
  for (const item of activities) {
    const day = activityDayLabel(item.createdAt);
    const current = groups[groups.length - 1];
    if (!current || current.day !== day) groups.push({ day, items: [item] });
    else current.items.push(item);
  }

  return (
    <div>
      {groups.map((group) => (
        <section key={group.day} className="leads-timeline-day">
          <h4 className="font-display text-[10px] uppercase tracking-[0.18em] text-cadet/70">{group.day}</h4>
          <ul>
            {group.items.map((item) => (
              <li key={item.id} className="leads-timeline-row" data-type={item.type}>
                <p className="pt-0.5 font-display text-[12px] tabular-nums text-[#bde0fe]/80">
                  {activityClock(item.createdAt)}
                </p>
                <div className="min-w-0">
                  <p className="text-[14px] text-white">{item.label}</p>
                  {item.detail ? <p className="mt-1 text-[13px] text-cadet">{item.detail}</p> : null}
                  <p className="mt-1 text-[12px] text-cadet/70">{item.actorLabel}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
