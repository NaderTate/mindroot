"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return <Button onPress={() => signOut()}>Sign Out</Button>;
}

export default LogoutButton;
