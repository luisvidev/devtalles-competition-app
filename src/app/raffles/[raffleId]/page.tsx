import { getRaffleById } from "@/actions/raffles/getRaffleById";

interface Props {
  params: {
    raffleId: string;
  };
}

const RaffleDetail = async ({ params }: Props) => {
  const { raffleId } = params;

  const { raffle, prizes } = await getRaffleById(raffleId);

  return (
    <section className="h-dvh px-4 py-8">
      <h1 className="text-4xl my-2 font-bold">{raffle!.name}</h1>
      <p className="text-slate-700">
        <span className="font-bold text-xs">
          Inicio: {raffle!.createdAt.toString()}
        </span>
        -
        <span className="font-bold text-xs text-red-700">
          Fin: {raffle!.endAt.toString()}
        </span>
      </p>
      <p className="my-2">{raffle?.description}</p>
      <div className="flex gap-4 justify-center items-center py-4 h-2/3">
        {prizes!.map((prize) => (
          <div
            key={prize.id}
            className="p-4 shadow-lg rounded flex flex-col text-white justify-center items-center w-1/6 bg-indigo-950 hover:shadow-none hover:bg-amber-200 hover:text-black duration-500"
          >
            <h5 className="text-xl text-center">{prize.name}</h5>
          </div>
        ))}
      </div>
      <div className="flex flex-col divide-y-2 divide-slate-200 text-gray-500">
        <p>Terminos y condiciones</p>
        <p>{raffle?.termsAndConditions}</p>
      </div>
    </section>
  );
};

export default RaffleDetail;
