import deleteSalesActions from "@/app/_actions/sales/delete-sale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import {
  ClipboardCopyIcon,
  Edit,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import UpsertCheetDialog from "./upsert-cheet-content";
import { ProductDTO } from "@/app/data-access/product/query-product";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { SalesDTO } from "@/app/data-access/sales/query-sales";
import { useState } from "react";

interface UpsertSaleDropdownMenuProps {
  products: ProductDTO[];
  productsOptions: ComboboxOption[];
  sale: Pick<SalesDTO, "id" | "saleProducts">;
}

const UpsertSaleDropdownMenu = ({
  sale,
  products,
  productsOptions,
}: UpsertSaleDropdownMenuProps) => {
  const [upsertSheetIsOpen, setUpsertSheetIsOpen] = useState(false);
  const handleCopyId = (saleId: string) => {
    navigator.clipboard.writeText(saleId);
    toast.success("ID copiado para área de transferência!");
  };

  const { execute: executeDeleteSales } = useAction(deleteSalesActions, {
    onError: () => {
      toast.error("Ocorreu um erro ao excluir a venda.");
    },
    onSuccess: () => {
      toast.success("Venda excluída com sucesso.");
    },
  });

  const handleContinueClick = () => {
    executeDeleteSales({ id: sale.id });
  };
  return (
    <>
      <Sheet open={upsertSheetIsOpen} onOpenChange={setUpsertSheetIsOpen}>
        <AlertDialog>
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
                  handleCopyId(sale.id);
                }}
              >
                <ClipboardCopyIcon size={16} />
                Copiar ID
              </DropdownMenuItem>

              <SheetTrigger asChild>
                <DropdownMenuItem className="gap-1.5" onClick={() => {}}>
                  <Edit size={16} />
                  Editar venda
                </DropdownMenuItem>
              </SheetTrigger>

              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="w-full gap-1.5" onClick={() => {}}>
                  <Trash2Icon size={16} />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Você esta prestes a excluir esta venda. Esta ação não pode ser
                desfeita. Deseja contiuar?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleContinueClick}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <UpsertCheetDialog
          isOpen={upsertSheetIsOpen}
          setSheetIsOpen={setUpsertSheetIsOpen}
          saleId={sale.id}
          products={products}
          data={productsOptions}
          defaultSelectedProducts={sale.saleProducts.map((saleProduct) => ({
            quantity: saleProduct.quantity,
            price: Number(saleProduct.price),
            id: saleProduct.productId,
            name: saleProduct.productName,
          }))}
        />
      </Sheet>
    </>
  );
};

export default UpsertSaleDropdownMenu;
