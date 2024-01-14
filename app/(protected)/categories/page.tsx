import { CateogoryForm } from "@/components/category-form";
import { CategoryCard } from "@/components/category-card";
import { PageLabel } from "@/components/page-label";
import { getCategories } from "@/actions/categories";
import { currentUser } from "@/lib/user";

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
    <div className="space-y-3">
      <PageLabel label="Categories" count={count} />
      <CateogoryForm />
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
