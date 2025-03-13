import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import SidebarButton from "./sidebar-button";

const Sidebar = () => {
  return (
    <div className="min-h-screen w-72 bg-white">
      <div className="flex h-20 items-center justify-center px-8 py-6">
        <h1 className="text-2xl font-bold text-[#333]">STOCKY</h1>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <SidebarButton href="/">
          <LayoutGridIcon size={20} />
          Dashboard
        </SidebarButton>

        <SidebarButton href="/products">
          <PackageIcon size={20} />
          Produtos
        </SidebarButton>

        <SidebarButton href="/sales">
          <ShoppingBasketIcon size={20} />
          Vendas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
