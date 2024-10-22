import { UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="p-5">
      <p>
        Hello, doctor!
      </p>
      <UserButton></UserButton>
    </div>
  );
}

export default Page;
