"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo, useState } from "react";
import { Product } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import formatCurrency from "@/app/_helpers/currency";
import TableDropdownMenuSales from "./table-dropdown-menu";

interface UpsertCheetDialogProps {
  products: Product[];
  data: ComboboxOption[];
}

interface SelectedProducts {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const UpsertCheetDialog = ({ data, products }: UpsertCheetDialogProps) => {
  const formSchema = z.object({
    productId: z.string().uuid({
      message: "Selecione um produto",
    }),
    quantity: z.coerce.number().int().positive({
      message: "A quantidade deve ser maior que zero",
    }),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 0,
    },
  });

  const [selectedProduct, setSelectedProduct] = useState<SelectedProducts[]>(
    [],
  );
  const onSubmit = (data: FormSchemaType) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    setSelectedProduct((currentProducts: SelectedProducts[]) => {
      const productExists = currentProducts.find(
        (product) => product.id === data.productId,
      );

      if (productExists) {
        const isOutOfStock =
          productExists.quantity + data.quantity > selectedProduct.stock;

        if (isOutOfStock) {
          form.setError("quantity", {
            message: "Quantidade insuficiente em estoque",
          });
          return currentProducts;
        }

        form.reset();

        return currentProducts.map((product) => {
          if (product.id === data.productId) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }

          return product;
        });
      }

      const isOutOfStock = data.quantity > selectedProduct.stock;
      if (isOutOfStock) {
        form.setError("quantity", {
          message: "Quantidade insuficiente em estoque",
        });
        return currentProducts;
      }

      form.reset();

      return [
        ...currentProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };
  const totalProducts = useMemo(() => {
    return selectedProduct.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProduct]);
  const OnDelete = (productId: string) => {
    setSelectedProduct((currentProducts) => {
      return currentProducts.filter((product) => product.id !== productId);
    });
  };

  return (
    <>
      <SheetContent className="!max-w-[600px] p-6">
        <SheetHeader>
          <SheetTitle>Cadastrar Venda</SheetTitle>
          <SheetDescription>
            Preencha os campos abaixo para cadastrar uma nova venda.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className="space-y-6 py-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Produto</FormLabel>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      onChange={field.onChange}
                      options={data}
                      placeholder="Selecione um produto"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Digite a quantidade"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full gap-2"
              variant={"secondary"}
            >
              <PlusIcon size={16} />
              Adicionar Produto á venda
            </Button>
          </form>
        </Form>

        <Table className="w-full">
          <TableCaption>Produtos adicionados á venda</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Preço/Uni</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProduct.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>
                  {formatCurrency(product.price * product.quantity)}
                </TableCell>
                <TableCell>
                  <TableDropdownMenuSales
                    onDelete={OnDelete}
                    product={product}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableHead className="text-left">Total</TableHead>
              <TableCell colSpan={3} className="text-right">
                {formatCurrency(totalProducts)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </SheetContent>
    </>
  );
};

export default UpsertCheetDialog;
