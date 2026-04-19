import { toolCatalog } from "../lib/toolCatalog";

function ToolIcon({ color, symbol }) {
  return (
    <div className="relative h-10 w-10">
      <div
        className={`absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-md ${color} text-[10px] font-black text-white shadow-sm`}
      >
        {symbol}
      </div>
      <div
        className={`absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-md ${color} text-[9px] font-black text-white opacity-85 shadow-sm`}
      >
        ↘
      </div>
    </div>
  );
}

function WorkflowCard({ tool }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 p-6">
      <div className="pointer-events-none absolute right-5 top-5 h-12 w-12 rounded-xl border border-dashed border-slate-300" />
      <div className="pointer-events-none absolute -right-5 bottom-4 h-12 w-16 rounded-full border border-dashed border-slate-300" />
      <h3 className="text-[1.15rem] font-bold tracking-tight text-slate-800">
        Create a workflow
      </h3>
      <p className="mt-3 max-w-[16rem] text-[13px] leading-5 text-slate-500">
        Create custom workflows with your favorite tools, automate tasks, and
        reuse them anytime.
      </p>
      <a
        className="absolute bottom-5 left-6 text-sm font-semibold text-slate-800 transition hover:text-slate-950"
        href={`/${tool.slug}`}
      >
        Create workflow ↗
      </a>
    </article>
  );
}

function ToolCard({ tool }) {
  if (tool.special === "workflow") {
    return <WorkflowCard tool={tool} />;
  }

  return (
    <a
      className="group relative block rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.02)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
      href={`/${tool.slug}`}
    >
      {tool.badge ? (
        <span className="absolute right-4 top-4 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white">
          {tool.badge}
        </span>
      ) : null}

      <ToolIcon color={tool.color} symbol={tool.symbol} />

      <h3 className="mt-6 text-[1.15rem] font-bold tracking-tight text-slate-800">
        {tool.title}
      </h3>
      <p className="mt-3 text-[13px] leading-5 text-slate-500">
        {tool.description}
      </p>
    </a>
  );
}

function ToolsSection() {
  return (
    <section className="bg-[radial-gradient(circle_at_bottom_left,rgba(244,114,182,0.06),transparent_18%),radial-gradient(circle_at_top_right,rgba(251,113,133,0.08),transparent_18%),linear-gradient(180deg,#fdfdff_0%,#ffffff_24%)] py-10">
      <div className="mx-auto max-w-[1900px] px-4 sm:px-5 lg:px-7">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {toolCatalog.map((tool) => (
            <ToolCard key={tool.title} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ToolsSection;
