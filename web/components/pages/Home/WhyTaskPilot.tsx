import { LayoutDashboard, SlidersHorizontal, Lock, CalendarClock } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Clean dashboard",
    description:
      "See your progress at a glance — total tasks, completions, and pending work in one view.",
  },
  {
    icon: SlidersHorizontal,
    title: "Filter & search",
    description:
      "Find any task instantly. Filter by status or search by title — no more digging through lists.",
  },
  {
    icon: Lock,
    title: "Secure by default",
    description:
      "JWT-based auth keeps your tasks private. Your data belongs to you, always.",
  },
  {
    icon: CalendarClock,
    title: "Due date tracking",
    description:
      "Set deadlines and never miss them. TaskPilot keeps you on schedule without the noise.",
  },
];

export default function WhyTaskPilot() {
  return (
    <section className="bg-[#111827] py-9 md:py-16 px-6 md:px-10">
      <p className="text-sm md:text-base font-medium tracking-widest uppercase text-[#EE6C0E] mb-2">
        Why TaskPilot
      </p>

      <h2 className="text-3xl font-bold mb-6 md:mb-10 text-white">
        Everything you need,{" "}
        <span className="text-[#EE6C0E]">nothing you don&apos;t</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="bg-[#111827] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4 hover:border-[#EE6C0E]/30 transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-lg bg-[#EE6C0E]/10 flex items-center justify-center shrink-0">
                <Icon size={20} className="text-[#EE6C0E]" />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-base md:text-xl  font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-[#8892A4] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}