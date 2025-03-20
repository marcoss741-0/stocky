"use client";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import {
  ClipboardCopyIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";

interface TableDropdownMenuProps {
  product: Pick<Product, "id">;
  onDelete: (productId: string) => void;
}

const TableDropdownMenuSales = ({
  product,
  onDelete,
}: TableDropdownMenuProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer">
            <MoreHorizontalIcon size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="text-center font-semibold">
            Ações
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="gap-1.5"
            onClick={() => {
              navigator.clipboard.writeText(product.id);
            }}
          >
            <ClipboardCopyIcon size={16} />
            Copiar ID
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-1.5"
            onClick={() => onDelete(product.id)}
          >
            <Trash2Icon size={16} />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default TableDropdownMenuSales;
