import { UserAuthForm } from "@/components/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <div className="flex justify-center">
          <Image
            src="/logo-morado.png"
            width={250}
            height={250}
            alt="devtalles logo"
          />
        </div>
      </CardHeader>
      <CardContent>
        <UserAuthForm />
      </CardContent>
      <CardFooter className="grid">
        <p className="px-5 text-center text-sm text-muted-foreground">
          ¿Necesitas ayuda para ingresar al backoffice?
          <Link
            className="ml-2 text-secondary hover:underline underline-offset-4 hover:text-primary-accent"
            href={"https://cursos.devtalles.com/pages/contactanos"}
            target="_blank"
          >
            Contáctanos
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
