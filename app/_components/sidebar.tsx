const Sidebar = () => {
  return (
    <>
      <div className="w-72 bg-white min-h-screen">
        <div className="flex items-center justify-center h-20 py-6 px-8">
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
