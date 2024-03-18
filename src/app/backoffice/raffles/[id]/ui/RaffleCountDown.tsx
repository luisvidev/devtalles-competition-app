import Countdown from "react-countdown";

export const RaffleCountDown = (props: { endAt: Date }) => {
  const { endAt } = props;

  // Renderer callback with condition
  const rendererInCountDown = (props: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
    formatted: {
      days: string;
      hours: string;
      minutes: string;
      seconds: string;
    };
  }) => {
    const { formatted, days, completed } = props;
    if (completed) {
      return <span>You are good to go!</span>;
    } else {
      return (
        <div className="flex justify-center items-center h-full">
          <div className="grid grid-cols-4 gap-4 text-white bg-primary rounded-lg p-4 shadow-md">
            <div className="text-center">
              <div className="text-4xl font-bold">{days}</div>
              <div className="text-sm font-medium">Días</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{formatted.hours}</div>
              <div className="text-sm font-medium">Horas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{formatted.minutes}</div>
              <div className="text-sm font-medium">Minutos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{formatted.seconds}</div>
              <div className="text-sm font-medium">Segundos</div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold dark:text-white mb-3">
        Tiempo restante para para que finalice el sorteo:
      </h4>
      <div className="flex justify-center">
        <Countdown date={endAt} renderer={rendererInCountDown} />
      </div>
    </div>
  );
};
