import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useRaffleBoundStore } from "@/store/raffle";

import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { SectionForm } from "./section-form";

export const DetailsForm = () => {
  const name = useRaffleBoundStore((state) => state.name);
  const description = useRaffleBoundStore((state) => state.description);
  const termsAndConditions = useRaffleBoundStore(
    (state) => state.termsAndConditions
  );
  const imageUrl = useRaffleBoundStore((state) => state.imageUrl);

  const setName = useRaffleBoundStore((state) => state.setName);
  const setDescription = useRaffleBoundStore((state) => state.setDescription);
  const setTermsAndConditions = useRaffleBoundStore(
    (state) => state.setTermsAndConditions
  );
  const setImageUrl = useRaffleBoundStore((state) => state.setImageUrl);

  return (
    <SectionForm
      title="Detalles del sorteo"
      paragraph="Presenta información detallada sobre un sorteo específico. Incluye elementos como el nombre del sorteo para identificarlo fácilmente, una descripción concisa que resuma los objetivos y detalles clave del sorteo, una imagen representativa que puede visualizar el premio o capturar la esencia del evento, y términos y condiciones claros que delineen las reglas de participación"
    >
      <article className="space-y-4 ">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Nombre</Label>
          <Input
            required
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre del sorteo"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Añade una descripcion al sorteo"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image">Imagen</Label>
          <Input
            id="image"
            required
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="termsAndConditions">Terminos y condiciones</Label>
          <Textarea
            required
            id="termsAndConditions"
            placeholder="Añade los terminos y condiciones de tu sorteo"
            value={termsAndConditions}
            onChange={(e) => setTermsAndConditions(e.target.value)}
          />
        </div>
      </article>
    </SectionForm>
  );
};
