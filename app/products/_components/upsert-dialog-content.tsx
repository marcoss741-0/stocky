"use client";
import upsertProductsActions from "@/app/_actions/products/upsert-products";
import {
  formSchema,
  UpsertProductSchema,
} from "@/app/_actions/products/upsert-products/schema";
import { Button } from "@/app/_components/ui/button";
import { DialogHeader, DialogFooter } from "@/app/_components/ui/dialog";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Form } from "@/app/_components/ui/form";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

interface UpsertProductsDialogProps {
  isOpen?: () => void;
  defaultValues?: UpsertProductSchema;
}

const UpsertProductsDialog = ({
  isOpen,
  defaultValues,
}: UpsertProductsDialogProps) => {
  const form = useForm<UpsertProductSchema>({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
    defaultValues: defaultValues || {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const { execute: executeUpsertProducts } = useAction(upsertProductsActions, {
    onError: () => {
      toast.error("Ocorreu um erro ao salvar o produto.");
    },
    onSuccess: () => {
      isOpen?.();
      toast.success("Produto salvo com sucesso.");
    },
  });

  const onSubmit = async (data: UpsertProductSchema) => {
    executeUpsertProducts({ ...data, id: defaultValues?.id });
  };
  const isEditing = !!defaultValues;
  return (
    <>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? "Editar" : "Criar"} produto
              </DialogTitle>
              <DialogDescription>
                {isEditing
                  ? defaultValues?.name
                  : "Insira as informações do produto"}
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira o nome do produto" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <NumericFormat
                      thousandSeparator="."
                      decimalSeparator=","
                      fixedDecimalScale
                      decimalScale={2}
                      prefix="R$ "
                      allowNegative={false}
                      customInput={Input}
                      onValueChange={(value) => {
                        field.onChange(value.floatValue);
                      }}
                      {...field}
                      onChange={() => {}}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Insira a quantidade em estoque"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" type="reset">
                  Cancelar
                </Button>
              </DialogClose>

              <Button type="submit">
                {form.formState.isSubmitting && (
                  <Loader className="mr-2 animate-spin" />
                )}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </>
  );
};

export default UpsertProductsDialog;
