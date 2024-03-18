import { getRaffleById } from "@/actions/raffles/getRaffleById";
import { RaffleDetail } from "./ui/RaffleDetail";
import { GoBackButton } from "@/components/layout/common/GoBackButton";
import { getParticipation } from "@/actions/raffles/getPaticipation";

interface Props {
  params: {
    raffleId: string;
  };
}

const RafflePage = async ({ params }: Props) => {
  const { raffleId } = params;

  const { raffle, prizes } = await getRaffleById(raffleId);
  const participationResponse = await getParticipation(raffleId);

  if (!raffle) return null;

  return (
    <section className="h-dvh">
      <GoBackButton />
      <RaffleDetail
        raffle={raffle}
        totalParticipants={0}
        authorEmail={""}
        prizes={prizes}
        participationResponse={participationResponse}
      />
    </section>
  );
};

export default RafflePage;
