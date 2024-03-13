import { UserAuthForm } from "@/components/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage(){
    
    return (
        <Card className="max-w-sm">

          <CardHeader>
            <CardTitle className="text-2xl text-accent">Sign in</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <UserAuthForm/>
          </CardContent>
          <CardFooter className="grid">
            <p className="px-8 text-center text-sm text-muted-foreground">
                Don't have an account?
                <Link 
                    className="ml-2 text-secondary hover:underline underline-offset-4 hover:text-primary-accent"
                    href={'new-account'}
                >
                    Sign up
                </Link>
            </p>
            
          </CardFooter>
        </Card>
 )
}