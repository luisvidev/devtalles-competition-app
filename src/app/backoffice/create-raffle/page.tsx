"use client";
import { addRaffle } from "@/actions/raffles/addRaffle";
import { DateForm } from "@/components/create-raffle/date-form";
import { DetailsForm } from "@/components/create-raffle/details-form";
import { PrizeForm } from "@/components/create-raffle/prize-form";
import { ProgresBar } from "@/components/multi-step/progres-bar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMultiStep } from "@/hooks/useMultiStep";
import { useRaffleBoundStore } from "@/store/raffle";
import {
  CalendarIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ListBulletIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import Swal from "sweetalert2";

const steps = [
  {
    text: "Detalles",
    icon: ListBulletIcon,
    step: <DetailsForm />,
  },
  {
    text: "Fecha",
    icon: CalendarIcon,
    step: <DateForm />,
  },
  {
    text: "Premio",
    icon: ListBulletIcon,
    step: <PrizeForm />,
  },
];

export default function CreateRafflePage() {
  const { step, currentStepIndex, back, next } = useMultiStep(
    steps.map((step) => step.step)
  );

  const name = useRaffleBoundStore((state) => state.name);
  const description = useRaffleBoundStore((state) => state.description);
  const termsAndConditions = useRaffleBoundStore(
    (state) => state.termsAndConditions
  );
  const endDate = useRaffleBoundStore((state) => state.endDate);
  const imageUrl = useRaffleBoundStore((state) => state.imageUrl);
  const prizes = useRaffleBoundStore((state) => state.prizes);

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send request
    if (currentStepIndex === 2) {
      console.log(e.target);

      try {
        const response = await addRaffle({
          raffle: {
            name,
            description,
            termsAndConditions,
            timezone: "America/Toronto",
            endAt: endDate,
            imageUrl,
          },
          prizes: prizes.map(
            ({ prizeName: name, prizeDescription: description }) => ({
              name,
              description,
            })
          ),
        });

        if (response.ok) {
          alert(`success`);
          redirect("/backoffice/raffles");
        }
        if (!response.ok) alert(`error: ${response.errorMessage}`);
      } catch (error) {
        alert(`error: ${(error as Error).message}`);
      }
    } else {
      next();
    }

    console.log({ e, currentStepIndex });

    // addRaffle()
  };

  return (
    <section className="">
      <Card className="max-w-6xl mx-auto mt-12 overflow-hidden">
        <form onSubmit={(e) => submitForm(e)}>
          <CardHeader className="bg-primary space-y-4">
            <div className="flex justify-between border-b border-b-primary-accent py-2">
              <div>
                <CardTitle className="text-white text-xl">
                  Crear sorteo
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Deploy your new project in one-click.
                </CardDescription>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant={"ghost"}
                  className="bg-white text-secondary"
                  type="button"
                  onClick={back}
                >
                  <CaretLeftIcon className="w-4 h-4" />
                  Back
                </Button>
                <Button
                  variant={"secondary"}
                  className="bg-secondary text-white"
                  type="submit"
                >
                  {currentStepIndex + 1 < steps.length
                    ? "Siguiente"
                    : "Agregar sorteo"}
                  {currentStepIndex + 1 < steps.length ? (
                    <CaretRightIcon className="w-4 h-4" />
                  ) : (
                    <PlusCircledIcon className="ml-2 w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            <ProgresBar
              currentStep={currentStepIndex}
              steps={steps.map(({ text, icon }) => {
                return {
                  text,
                  icon,
                };
              })}
            />
          </CardHeader>
          <CardContent>{step}</CardContent>
        </form>
      </Card>
    </section>
  );
}
