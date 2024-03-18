import { getRaffleById } from "@/actions/raffles/getRaffleById";
import { RaffleDetail } from "@/app/backoffice/raffles/[id]/ui/RaffleDetail";
import { GoBackButton } from "@/components/layout/common/GoBackButton";

interface Props {
  params: {
    raffleId: string;
  };
}

const RafflePage = async ({ params }: Props) => {
  const { raffleId } = params;

  const { raffle, prizes } = await getRaffleById(raffleId);

  if (!raffle) return null;

  console.log({ raffle });

  return (
    <section className="h-dvh">
      <GoBackButton />
      <RaffleDetail
        raffle={raffle}
        totalParticipants={0}
        authorEmail={""}
        prizes={prizes}
      />
    </section>
  );
};

export default RafflePage;
