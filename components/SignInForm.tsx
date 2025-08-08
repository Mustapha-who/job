import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, LogsIcon } from "lucide-react";
import { login } from "@/lib/auth";

async function handleGitHubSignIn() {
  "use server";
  await login();
}

export function SignInForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Sign in to your account to access the job board
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleGitHubSignIn}>
          <Button type="submit" className="w-full" size="lg">
            <Github className="mr-2 h-5 w-5" />
            Sign in with GitHub
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
