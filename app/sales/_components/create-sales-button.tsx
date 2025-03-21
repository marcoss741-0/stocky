"use client";

import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { PlusCircleIcon } from "lucide-react";
import UpsertCheetDialog from "./upsert-cheet-content";
import { Product } from "@prisma/client";
import { ComboboxOption } from "@/app/_components/ui/combobox";
import { useState } from "react";

interface CreateSalesButtonProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const CreateSalesButton = ({
  productOptions,
  products,
}: CreateSalesButtonProps) => {
  const [sheetIsopen, setSheetIsopen] = useState(false);
  return (
    <>
      <Sheet open={sheetIsopen} onOpenChange={setSheetIsopen}>
        <SheetTrigger asChild>
          <Button>
            <PlusCircleIcon size={20} />
            Nova Venda
          </Button>
        </SheetTrigger>
        <UpsertCheetDialog
          onClose={() => setSheetIsopen(false)}
          products={products}
          data={productOptions}
        />
      </Sheet>
    </>
  );
};

export default CreateSalesButton;
