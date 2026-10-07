import { Eye, Compass, ShieldCheck } from 'lucide-react';

export const PrinciplesSection: React.FC = () => {
  const points = [
    {
      num: '01',
      title: 'Clarity over noise',
      description: 'Remove chart clutter. Instead of stacking five lagging indicators, trade with clean, objective swing structure and premium/discount zones.',
      icon: <Eye className="size-6 text-[#4F6BFF]" />,
      badgeBg: 'bg-[#EEF2FF]',
      badgeText: 'text-[#4F6BFF]',
    },
    {
      num: '02',
      title: 'Context over guesswork',
      description: 'Local price action only makes sense within the higher timeframe. Align your entries with macro order flow before risking capital.',
      icon: <Compass className="size-6 text-[#8B5CF6]" />,
      badgeBg: 'bg-[#F4F0FF]',
      badgeText: 'text-[#8B5CF6]',
    },
    {
      num: '03',
      title: 'Discipline over emotion',
      description: 'Deterministic bar-close verification. Signals never repaint, and every setup calculates an unambiguous structural invalidation level.',
      icon: <ShieldCheck className="size-6 text-[#059669]" />,
      badgeBg: 'bg-[#ECFBF6]',
      badgeText: 'text-[#059669]',
    },
  ];

  return (
    <section id="principles" className="py-20 sm:py-28 bg-[#F1F4FF]/70 border-b border-[#EAEAE5]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#4F6BFF] bg-white px-3 py-1 rounded-full border border-[#E0E7FF] shadow-xs">
            Why AlgoFinex
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17181C] tracking-tight mt-4">
            Designed for disciplined traders.
          </h2>
          <p className="mt-3 text-base text-[#666B76] leading-relaxed">
            Three principles behind every tool we develop.
          </p>
        </div>

        {/* 3 Simple, Airy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {points.map((point) => (
            <div
              key={point.num}
              className="rounded-3xl bg-white border border-[#EAEAE5] p-8 sm:p-9 text-left shadow-xs hover:shadow-card-hover hover:border-[#4F6BFF]/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-3 rounded-2xl ${point.badgeBg}`}>
                    {point.icon}
                  </div>
                  <span className="text-xs font-bold tracking-widest text-[#9CA3AF]">
                    {point.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#17181C] tracking-tight">
                  {point.title}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#666B76] leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
