import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  ClipboardCopyIcon,
  EditIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import DeleteProductsContent from "./delete-products-content";
import UpsertProductsDialog from "./upsert-dialog-content";
import { Product } from "@prisma/client";
import { useState } from "react";

interface TableDropdownMenuProps {
  row: Product;
}

const TableDropdownMenu = ({ row: product }: TableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <AlertDialog>
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
                <span>Copiar ID</span>
              </DropdownMenuItem>

              <DialogTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <EditIcon size={16} />
                  Editar
                </DropdownMenuItem>
              </DialogTrigger>

              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="gap-1.5">
                  <Trash2Icon size={16} />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <UpsertProductsDialog
            defaultValues={{
              id: product.id,
              name: product.name,
              price: Number(product.price),
              stock: product.stock,
            }}
            isOpen={() => setEditDialogOpen(false)}
          />
          <DeleteProductsContent productId={product.id} />
        </Dialog>
      </AlertDialog>
    </>
  );
};

export default TableDropdownMenu;
