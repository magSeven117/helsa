import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-screen h-screen">
      <div className="h-full w-full max-sm:hidden flex justify-center items-center">
        <div className="flex flex-col justify-between items-center max-w-[400px]">
          <h1 className="text-3xl font-semibold text-center mb-5">Transform your Phone into a Classroom</h1>
          <p className='text-sm font-medium text-center'>Seize the moment and help shape the future by starting a career in blockchain now</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <SignUp 
          appearance={{
            layout: {
              logoImageUrl: '/images/logo.png',
              logoLinkUrl: '/',
              helpPageUrl: 'https://github.com/Duccem',
              socialButtonsPlacement: 'bottom',
              shimmer: true
            }
          }}
        />
      </div>
    </div>
  );
}