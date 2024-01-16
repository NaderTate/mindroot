import { getCategories } from "@/actions/categories";
import { getProjects } from "@/actions/projects";
import { getTeams } from "@/actions/teams";
import PageContainer from "@/components/PageContainer";
import { NewProject } from "@/components/new-project-form";
import { PageLabel } from "@/components/page-label";

type ProjectsPageProps = { searchParams: { page: number; search?: string } };

const ProjectsPage = async ({ searchParams }: ProjectsPageProps) => {
  const { page, search } = searchParams;
  const { projects, count } = await getProjects(page, search);
  const { categories } = await getCategories({
    getAll: true,
    select: {
      name: true,
      id: true,
    },
  });
  const { teams } = await getTeams({
    getAll: true,
    select: { id: true, name: true },
  });
  return (
    <PageContainer>
      <PageLabel label="Projects" count={count} />
      <NewProject allCategories={categories} allTeams={teams} />
    </PageContainer>
  );
};

export default ProjectsPage;
