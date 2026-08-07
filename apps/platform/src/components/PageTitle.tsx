type PageTitleProps = {
  title: string;
  subtitle: string;
};

function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </>
  );
}

export default PageTitle;