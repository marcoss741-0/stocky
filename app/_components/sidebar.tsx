const Sidebar = () => {
  return (
    <>
      <div className="min-h-screen w-72 bg-white">
        <div className="flex h-20 items-center justify-center px-8 py-6">
          <h1 className="text-2xl font-bold text-[#333]">STOCKY</h1>
        </div>

        <div className="flex flex-col gap-2 p-2">
          <button className="px-4 py-3">Dashboard</button>
          <button className="px-4 py-3">Produtos</button>
          <button className="px-4 py-3">Vendas</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
