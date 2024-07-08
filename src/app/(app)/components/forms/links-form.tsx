'use client';
import { Button } from '@/libs/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/libs/shadcn-ui/card';
import { Combobox } from '@/libs/shadcn-ui/combobox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/libs/shadcn-ui/form';
import { Icons } from '@/libs/shadcn-ui/icons';
import { Input } from '@/libs/shadcn-ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ClipboardCheck,
  Delete,
  Globe,
  Loader2,
  Plus,
  Save,
  SquareArrowOutUpRight,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

const links = [
  {
    name: 'GitHub',
    url: 'https://github.com/Duccem',
  },
  {
    name: 'LinkedIn',
    url: '',
  },
  {
    name: 'Twitter',
    url: '',
  },
  {
    name: 'Instagram',
    url: '',
  },
  {
    name: 'Facebook',
    url: '',
  },
  {
    name: 'Website',
    url: '',
  },
];

const icons = {
  GitHub: <Icons.gitHub className="w-3 h-3" />,
  LinkedIn: <Icons.likedin className="w-3 h-3" />,
  Twitter: <Icons.twitter className="w-3 h-3" />,
  Instagram: <Icons.facebook className="w-3 h-3" />,
  Facebook: <Icons.facebook className="w-3 h-3" />,
  Website: <Globe className="w-3 h-3" />,
};
const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  url: z.string().min(1, { message: 'URL is required' }),
});

interface LinksFormProps {}
const LinksForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
    },
    mode: 'all',
  });
  const { isValid, isSubmitting } = form.formState;
  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success('Link copied to clipboard');
  };
  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsEditing(false);
  };
  const deleteLink = async (name: string) => {
    setIsUpdating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUpdating(false);
  }
  return (
    <Card className={`relative  overflow-scroll no-scroll height_transition  ${ isEditing ? 'max-h-[300px]' : 'max-h-[600px]' }`}>
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/50 top-0 right-0 rounded-m flex items-center justify-center z-10 rounded-lg">
          <Loader2 className="animate-spin h-6 w-6" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Links
          <Button
            variant="ghost"
            className="gap-1 text-sm"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {!isEditing ? (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            ) : (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`flex flex-col my-4 w-full gap-4 justify-between items-start `}
      >
        {!isEditing ? (
          <div className="relative w-1/3 flex flex-col gap-2">
            {links.map((link) => (
              <div
                key={link.name}
                className="flex justify-between items-center gap-2  px-2 py-0"
              >
                <div className="flex items-center gap-2 w-1/2">
                  {icons[link.name]}
                  <span>{link.name}</span>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <a href={link.url} target="_blank">
                    <Button className="px-1 py-0 w-8 h-8 bg-transparent hover:bg-muted">
                      <SquareArrowOutUpRight className="h-4 w-4 text-foreground" />
                    </Button>
                  </a>
                  <Button
                    className="px-1 py-0 w-8 h-8 bg-transparent  hover:bg-muted"
                    onClick={() => copyLink(link.url)}
                  >
                    <ClipboardCheck className="w-4 h-4 text-foreground"></ClipboardCheck>
                  </Button>
                  <Button className="px-1 py-0 w-8 h-8 bg-transparent hover:bg-muted" onClick={() => deleteLink(link.url)}>
                    <Delete className="w-4 h-4 text-foreground "></Delete>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4">
              <div className="flex justify-start items-center w-full gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex w-full justify-start items-start flex-col gap-1 mb-3">
                      <FormLabel className="text-sm text-color-foreground-secondary ">
                        Kind of link
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          options={Object.keys(icons).map((key) => ({
                            label: key,
                            value: key,
                          }))}
                          {...field}
                        ></Combobox>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="flex w-full justify-start items-start flex-col gap-1 mb-3">
                      <FormLabel className="text-sm text-color-foreground-secondary ">
                        Url: 
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://x.com/handle"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-center mt-5 gap-x-2">
                <Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  className="bg-background border border-border rounded-3xl text-foreground gap-1 text-sm p-4 hover:bg-foreground hover:text-background"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default LinksForm;
