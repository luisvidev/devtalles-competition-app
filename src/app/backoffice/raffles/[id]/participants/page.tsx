import { getSubscribers } from "@/actions/raffles/getSubscribers";
import { GoBackButton } from "@/components/layout/common/GoBackButton";
import dayjs from "@/lib/dayjs";

export default async function ParticipantsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { subscribers, ok } = await getSubscribers({ raffleId: params.id });

  return (
    <div className="pl-10">
      <GoBackButton />
      <h1 className="text-lg font-semibold text-gray-800 my-4">Paricipantes</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Correo eletrónico
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha de inscripción
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers?.map((item) => (
              <tr
                key={item.email}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.email}
                </th>
                <td className="px-6 py-4">
                  {dayjs(item.subscriptionDate).format("YYYY/MM/DD HH:mm:ss")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
