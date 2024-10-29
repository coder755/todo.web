type PageProps = {
  children: React.ReactNode,
};

function Page({ children }: PageProps) {
  return (
    <div>
      { children }
    </div>
  );
}

export default Page;
