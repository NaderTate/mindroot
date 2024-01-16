import { CateogoryForm } from "@/components/category-form";
import { CategoryCard } from "@/components/category-card";
import { PageLabel } from "@/components/page-label";
import { getCategories } from "@/actions/categories";
import { currentUser } from "@/lib/user";
import ContentContainer from "@/components/content-container";
import PageContainer from "@/components/PageContainer";

type CategoriesPageProps = { searchParams: { page: number; search?: string } };

const CategoriesPage = async ({ searchParams }: CategoriesPageProps) => {
  const user = await currentUser();
  const { page, search } = searchParams;

  const { categories, count } = await getCategories({
    page,
    search,
    select: {
      _count: { select: { projects: { where: { userId: user?.id } } } },
      name: true,
      id: true,
    },
  });

  return (
    <PageContainer>
      <PageLabel label="Categories" count={count} />
      <CateogoryForm />
      <ContentContainer>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ContentContainer>
    </PageContainer>
  );
};

export default CategoriesPage;
