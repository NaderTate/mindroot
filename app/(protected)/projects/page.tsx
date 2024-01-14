import { getCategories } from "@/actions/categories";
import { getProjects } from "@/actions/projects";
import { NewProject } from "@/components/new-project-form";
import { PageLabel } from "@/components/page-label";

type ProjectsPageProps = { searchParams: { page: number; search?: string } };

const ProjectsPage = async ({ searchParams }: ProjectsPageProps) => {
  const { page, search } = searchParams;
  const { projects, count } = await getProjects(page, search);
  const { categories: allCategories } = await getCategories({
    getAll: true,
    select: {
      name: true,
      id: true,
    },
  });
  return (
    <div className="space-y-5">
      <PageLabel label="Projects" count={count} />
      <NewProject allCategories={allCategories} />
    </div>
  );
};

export default ProjectsPage;
