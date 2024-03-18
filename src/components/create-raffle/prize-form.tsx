import { PlusIcon, RocketIcon } from "@radix-ui/react-icons";
import { SectionForm } from "./section-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useRaffleBoundStore } from "@/store/raffle";
import { FormEvent, useState } from "react";

export const PrizeForm = () => {
  const prizes = useRaffleBoundStore((state) => state.prizes);
  const addPrize = useRaffleBoundStore((state) => state.addPrize);

  const [prizeName, setPrizeName] = useState("");
  const [prizeDescription, setPrizeDescription] = useState("");

  const handleSubmit = () => {
    addPrize(prizeName, prizeDescription);
  };

  return (
    <SectionForm
      title="Premios"
      paragraph="Este apartado permite a los participantes conocer los posibles premios que podrían ganar al participar en el sorteo, lo que puede aumentar su interés y motivación para participar."
    >
      <article className="">
        <form className="col-span-2">
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input
                type="text"
                id="name"
                required
                value={prizeName}
                onChange={(e) => setPrizeName(e.target.value)}
                placeholder="Nombre del Premio"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                required
                value={prizeDescription}
                onChange={(e) => setPrizeDescription(e.target.value)}
                placeholder="Escribe la descripción del premio"
              />
            </div>
            <Button type="button" onClick={handleSubmit}>
              <PlusIcon className="mr-2" />
              Agregar
            </Button>
          </div>
        </form>

        <div className="mt-2">
          {prizes.map((prize) => (
            <PrizeItem
              id={prize.id}
              title={prize.prizeName}
              description={prize.prizeDescription}
            />
          ))}
        </div>
      </article>
    </SectionForm>
  );
};

interface PrizeItem {
  id: number;
  title: string;
  description: string;
}

const PrizeItem = ({ id, title, description }: PrizeItem) => {
  const remove = useRaffleBoundStore((state) => state.removePrize);
  return (
    <div className=" flex h-fit items-center space-x-4 rounded-md border p-4">
      <RocketIcon />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button onClick={() => remove(id)}>Eliminar</Button>
    </div>
  );
};
