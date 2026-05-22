const steps = [
  {
    number: "1",
    title: "CULTURAL BLUEPRINT",
    description: "We begin by deep-diving into your heritage requirements, identifying the specific cultural nuances that will define your celebration's soul.",
  },
  {
    number: "2",
    title: "ARTISAN SELECTION",
    description: "Match with our vetted reserve of artisans who don't just provide services, but understand the emotional weight of your traditions.",
  },
  {
    number: "3",
    title: "ELITE COLLABORATION",
    description: "Manage your entire event lifecycle through our bespoke dashboard, designed for seamless communication and elite transparency.",
  },
];

export default function Planning() {
  return (
    <section className="bg-[#131313] py-24 px-8 font-montserrat overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Process Steps */}
        <div className="relative">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#F2CA50] font-bold block mb-4">
              THE PROCESS
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-100 tracking-tight">
              The Art of Planning
            </h2>
          </div>

          {/* Steps List */}
          <div className="space-y-16 relative">
            {/* Vertical Line Connector */}
            <div className="absolute left-[18px] top-2 bottom-2 w-[1px] bg-white/10 z-0 hidden sm:block" />

            {steps.map((step, index) => (
              <div key={index} className="flex gap-8 relative z-10">
                {/* Step Number Circle */}
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#F2CA50] flex items-center justify-center text-[#0D0D0D] text-sm font-bold shadow-[0_0_20px_rgba(242,202,80,0.2)]">
                  {step.number}
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-serif text-stone-100 tracking-wide mb-4">
                    {step.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed max-w-md font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="relative aspect-square lg:aspect-auto lg:h-[700px] overflow-hidden group">
          <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
          <img 
            src="/planning.png" // Placeholder or user provided
            alt="The Art of Planning"
            className="w-full h-full object-cover"
          />
          </div>

      </div>
    </section>
  );
}
