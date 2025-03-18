import DeleteProducts from "@/app/_actions/products/delete-products";
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

interface DeleteProductsContentProps {
  productId: string;
}

const DeleteProductsContent = ({ productId }: DeleteProductsContentProps) => {
  const handleContinueClick = async () => {
    try {
      await DeleteProducts({ id: productId });
      toast.success("Produto foi excluido!.");
    } catch (error) {
      toast.error("Ocorreu um erro ao excluir o produto." + error);
    }
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
