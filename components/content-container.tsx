type Props = { children: React.ReactNode };

const ContentContainer = ({ children }: Props) => {
  return <div className="flex flex-wrap gap-3">{children}</div>;
};

export default ContentContainer;
