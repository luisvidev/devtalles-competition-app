export default function Loading() {
  return (
    <div className="h-dvh">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col  justify-center items-center bg-white h-screen dark:invert">
          <div className="flex justify-center space-x-2">
            <div className="h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-4 w-4 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-4 w-4 bg-primary rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-xl font-extrabold text-primary dark:text-white">
            Cargando...
          </h1>
        </div>
      </div>
    </div>
  );
}
