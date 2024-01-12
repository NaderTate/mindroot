import { auth } from "@/auth";
import LogoutButton from "@/components/auth/logout-button";
import { NextPage } from "next";

type DashboardPageProps = {};

const DashboardPage: NextPage = async ({}: DashboardPageProps) => {
  const session = await auth();
  return (
    <>
      {session?.user.email} <LogoutButton />
    </>
  );
};

export default DashboardPage;
