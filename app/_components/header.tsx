interface HeaderProps {
  title: string;
  subtitle: string;
  rightButton?: React.ReactNode;
}

const Header = ({ title, subtitle, rightButton }: HeaderProps) => {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs text-[#00A180]">{subtitle}</span>
          <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        </div>
        {rightButton}
      </div>
    </>
  );
};

export default Header;
