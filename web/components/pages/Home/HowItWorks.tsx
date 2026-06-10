import {
  UserPlus,
  ListPlus,
  SlidersHorizontal,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create your account",
    description:
      "Sign up in seconds. No credit card, no setup — just your email and you're in.",
  },
  {
    step: "02",
    icon: ListPlus,
    title: "Add your tasks",
    description:
      "Create tasks with a title, description, and due date. Keep it simple or go detailed.",
  },
  {
    step: "03",
    icon: SlidersHorizontal,
    title: "Filter & organize",
    description:
      "Search, filter by status, and sort your workload exactly how you think.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Track & complete",
    description:
      "Mark tasks done and watch your completion rate climb on the dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-9 md:py-16 px-6 md:px-10">
      <p className="text-sm md:text-base font-medium tracking-widest uppercase text-[#EE6C0E] mb-2">
        How it works
      </p>
      <h2 className="text-3xl font-bold mb-6 md:mb-10">
        Up and running in <span className="text-[#EE6C0E]">four steps</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.step} className="relative flex flex-col h-full">
              {!isLast && (
                <div className="hidden lg:block absolute top-5 left-[calc(100%-1rem)] w-8 h-px bg-[#EE6C0E]/20 z-10" />
              )}

              <div className="flex-1 h-full bg-[#111827] border border-white/[0.06] rounded-xl p-5 flex flex-col gap-4 hover:border-[#EE6C0E]/30 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#EE6C0E]/10 flex items-center justify-center">
                    <Icon size={20} className="text-[#EE6C0E]" />
                  </div>
                  <span className="text-2xl font-bold text-white/30">
                    {step.step}
                  </span>
                </div>

                {/* flex-1 — description ko neeche push karta hai equal height ke liye */}
                <div className="flex flex-col gap-1 flex-1">
                  <h3 className="text-base md:text-lg font-medium text-white">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#8892A4] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
