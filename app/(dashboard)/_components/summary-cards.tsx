export const SummaryCardTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <p className="text-sm font-medium text-slate-500">{children}</p>
    </>
  );
};
export const SummaryCardIcon = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-slate-100">
      {children}
    </div>
  );
};
export const SummaryCardValue = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-2xl font-semibold text-slate-900">{children}</p>;
};
const SummaryCards = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="rounded-xl bg-slate-100 p-6">{children}</div>
    </>
  );
};

export default SummaryCards;

export const SummaryCardSkeleton = () => {
  return (
    <div className="rounded-xl bg-white p-6">
      <div className="space-y-2">
        <div className="h-9 w-9 rounded-md bg-gray-200" />
        <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
        <div className="h-8 w-48 rounded-md bg-gray-200" />
      </div>
    </div>
  );
};
