type PageLabelProps = { label: string; count?: number };

export const PageLabel = async ({ label, count }: PageLabelProps) => {
  return (
    <h1 className="text-xl">
      {label} {label && <span className="text-xs">({count})</span>}
    </h1>
  );
};
