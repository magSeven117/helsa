const Page = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return <div></div>;
};

export default Page;
