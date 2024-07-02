'use client';
import { Button } from '@/libs/shadcn-ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/libs/shadcn-ui/card';
import { Icons } from '@/libs/shadcn-ui/icons';
import { Input } from '@/libs/shadcn-ui/input';
import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function SignUpForm() {
  return (
    <div className="grid w-full h-full grow items-center px-20">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start" className='w-full'>
                <Card className="border-none shadow-none w-full">
                  <CardHeader>
                    <CardTitle>Create your account</CardTitle>
                    <CardDescription>Welcome! Please fill in the details to get started.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <div className="grid grid-cols-2 gap-x-4">
                      <Clerk.Connection name="facebook" asChild>
                        <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading}>
                          <Clerk.Loading scope="provider:facebook">
                            {(isLoading) =>
                              isLoading ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Icons.facebook className="mr-2 size-4" />
                                  GitHub
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name="google" asChild>
                        <Button size="sm" variant="outline" type="button" disabled={isGlobalLoading}>
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Icons.google className="mr-2 size-4" />
                                  Google
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                    </div>
                    <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                      or
                    </p>
                    <Clerk.Field name="emailAddress" className="space-y-2">
                      <Clerk.Label asChild>
                        <Clerk.Label>Email address</Clerk.Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                    <Clerk.Field name="password" className="space-y-2">
                      <Clerk.Label asChild>
                        <Clerk.Label>Password</Clerk.Label>
                      </Clerk.Label>
                      <Clerk.Input type="password" required asChild>
                        <Input/>
                      </Clerk.Input>
                      <Clerk.FieldError className="block text-sm text-destructive" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? <Loader2 className="size-4 animate-spin" /> : 'Continue';
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                      <Button variant="link" size="sm" asChild>
                        <Link href="/sign-in">Already have an account? Sign in</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}