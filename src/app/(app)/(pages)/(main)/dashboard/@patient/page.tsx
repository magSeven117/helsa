import { UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="p-5">
      <p>
        Hello, patient!
      </p>
      <UserButton></UserButton>
    </div>
  );
}

export default Page;
