import { Button } from '@/libs/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/libs/shadcn-ui/card';
import { currentUser } from '@clerk/nextjs/server';

import { Input } from '@/libs/shadcn-ui/input';
import { Label } from '@/libs/shadcn-ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/libs/shadcn-ui/tabs';

const Page = async () => {
  const { fullName } = await currentUser();
  return (
    <div className="flex flex-col justify-start items-start w-full p-4">
      <h1 className="text-2xl font-bold">{fullName}</h1>
      <div>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="flex justify-start gap-2 bg-background items-start">
            <TabsTrigger value="account" className='shadow-none data-[state=active]:shadow-none w-fit px-0 data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none'>User data</TabsTrigger>
            <TabsTrigger value="password" className='shadow-none data-[state=active]:shadow-none w-fit px-0 data-[state=active]:border-b-2 data-[state=active]:border-foreground rounded-none'>Doctor data</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when youre done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, youll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Page;
