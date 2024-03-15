import { CardStackIcon } from "@radix-ui/react-icons";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface Route {
  path: string;
  icon: React.ElementType;
  name: string;
}

const adminPrefix = "/backoffice";

const routesAdmin: Route[] = [
  {
    path: `${adminPrefix}/raffles`,
    icon: CardStackIcon,
    name: "Sorteos",
  },
  {
    path: `${adminPrefix}/Participantes`,
    icon: InfoCircledIcon,
    name: "Participantes",
  },
];

export default routesAdmin;
