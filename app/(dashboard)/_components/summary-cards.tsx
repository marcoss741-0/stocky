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
    <div className="bg-opacity-75 mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-emerald-500">
      {children}
    </div>
  );
};
export const SummaryCardValue = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <p className="mt-1 text-2xl font-semibold text-slate-800">{children}</p>
  );
};
const SummaryCards = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="rounded-xl bg-slate-100 p-6">{children}</div>
    </>
  );
};

export default SummaryCards;
