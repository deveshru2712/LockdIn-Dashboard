"use client";
import { User, LogOut, Settings, UserIcon } from "lucide-react";
import { Button } from "./ui/button";
import { authClient, signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function FloatingMenu() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleProfile = () => {
    // Add your profile navigation logic here
    console.log("Profile clicked");
  };

  return (
    <div className="fixed right-10 bottom-20 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="bg-primary hover:bg-primary/90 h-12 w-12 cursor-pointer rounded-full p-0 shadow-lg"
            size="icon"
          >
            <User size={20} className="text-primary-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          side="top"
          className="mb-2 w-56"
          sideOffset={8}
        >
          {!session ? (
            <>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push("/sign-in")}
                className="cursor-pointer"
              >
                <UserIcon className="h-4 w-4" />
                Login
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm leading-none font-medium">
                    {session.user?.name || "User"}
                  </p>
                  <p className="text-muted-foreground text-xs leading-none">
                    {session.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile}>
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut()}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
