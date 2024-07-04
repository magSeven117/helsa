import { UserButton } from "@clerk/nextjs";

const TopBar = () => {
  return (
    <div className="flex w-full flex-row-reverse p-3">
      <UserButton></UserButton>
    </div>
  );
}

export default TopBar;
