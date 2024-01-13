import { auth } from "@/auth";
import LogoutButton from "@/components/auth/logout-button";
import { NextPage } from "next";

type DashboardPageProps = {};

const DashboardPage: NextPage = async ({}: DashboardPageProps) => {
  const session = await auth();
  return (
    <div className="space-y-2">
      <h3>Welcome, {session?.user.name} </h3>
      <h3>Signed in as: {session?.user.email}</h3>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
