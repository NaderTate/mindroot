import { TeamForm } from "@/app/(protected)/teams/_components/team-form";
import { PageLabel } from "@/components/page-label";
import PageContainer from "@/components/PageContainer";

import { getTeams } from "@/actions/teams";
import { TeamCard } from "./_components/team-card";
import ContentContainer from "@/components/content-container";

type TeamsPageProps = { searchParams: { page: number; search: string } };

const TeamsPage = async ({ searchParams }: TeamsPageProps) => {
  const { page, search } = searchParams;

  const { teams, count } = await getTeams({
    page,
    search,
    select: {
      id: true,
      name: true,
      members: { select: { id: true, name: true, image: true } },
      _count: { select: { projects: true } },
    },
  });

  return (
    <PageContainer>
      <PageLabel label="Teams" count={count} />
      <TeamForm />
      <ContentContainer>
        {teams?.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default TeamsPage;
