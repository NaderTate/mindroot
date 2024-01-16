type Props = { children: React.ReactNode };

const PageContainer = ({ children }: Props) => {
  return <div className="space-y-3">{children}</div>;
};

export default PageContainer;
