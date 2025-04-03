import { CircleDashedIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { ProductStatus } from "../data-access/product/query-product";

interface ProductStatusBadgeProps {
  status: ProductStatus;
}

const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const label = status;

  const badgeVariant = (isAvailable: string) => {
    switch (isAvailable) {
      case "Fora de estoque":
        return "destructive";
      case "Em estoque":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Badge className="w-fit gap-1" variant={badgeVariant(label)}>
      <CircleDashedIcon size={16} />
      {label}
    </Badge>
  );
};

export default ProductStatusBadge;
