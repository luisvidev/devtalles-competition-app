import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

import { format } from "date-fns";

import { useRaffleBoundStore } from "@/store/raffle";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { SectionForm } from "./section-form";

export const DateForm = () => {
  const startDate = useRaffleBoundStore((state) => state.startDate);
  const endDate = useRaffleBoundStore((state) => state.endDate);

  const setStartDate = useRaffleBoundStore((state) => state.setStartDate);
  const setEndDate = useRaffleBoundStore((state) => state.setEndDate);

  const handleRangeChange = (range: DateRange | undefined) => {
    if (range?.from && range?.to) {
      // Si se han seleccionado ambas fechas en el rango
      const { from, to } = range;
      setStartDate(from);
      setEndDate(to);
    }
  };
  return (
    <SectionForm
      title="Fecha del sorteo"
      paragraph="Permite seleccionar la fecha de inicio y finalización del sorteo. Este apartado asegura que los participantes estén informados sobre el período durante el cual el sorteo estará activo y disponible para su participación"
    >
      <article>
        <div className="flex gap-4">
          <div className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="startDate">Fecha de inicio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="startDate"
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Escoge una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="endDate">Fecha final</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="endDate"
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Escoge una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  id="endDate"
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    required
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Calendar
            mode="range"
            selected={{ from: startDate, to: endDate }}
            className="rounded-md border shadow w-min"
          />
        </div>
      </article>
    </SectionForm>
  );
};
