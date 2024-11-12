export default async function ImageDisplay({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <div>ImageDisplay {id}</div>;
}
