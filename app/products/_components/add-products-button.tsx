"use client";

import { Dialog, DialogTrigger } from "../../_components/ui/dialog";
import { CirclePlusIcon } from "lucide-react";
import { Button } from "../../_components/ui/button";
import { useState } from "react";
import UpsertProductsDialog from "./upsert-dialog-content";

const AddProductsButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer gap-2">
            <CirclePlusIcon size={20} />
            Novo produto
          </Button>
        </DialogTrigger>
        <UpsertProductsDialog isOpen={() => setDialogIsOpen(false)} />
      </Dialog>
    </>
  );
};

export default AddProductsButton;
