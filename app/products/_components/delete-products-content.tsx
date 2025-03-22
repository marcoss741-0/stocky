import deleteProductsActions from "@/app/_actions/products/delete-products";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

interface DeleteProductsContentProps {
  productId: string;
}

const DeleteProductsContent = ({ productId }: DeleteProductsContentProps) => {
  const { execute: executeDeleteProducts } = useAction(deleteProductsActions, {
    onError: () => {
      toast.error("Ocorreu um erro ao excluir o produto.");
    },
    onSuccess: () => {
      toast.warning("Produto foi excluido!");
    },
  });

  const handleContinueClick = () => {
    executeDeleteProducts({ id: productId });
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tem certeza que quer excluir?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta ação não pode ser desfeita. Isso excluirá permanentemente o
          produto e removerá seus dados de nossos servidores.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductsContent;
