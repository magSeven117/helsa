import { Avatar, AvatarImage } from "@/libs/shadcn-ui/avatar";
import { Button } from "@/libs/shadcn-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/libs/shadcn-ui/card";
import { Icons } from "@/libs/shadcn-ui/icons";
import { User } from "@clerk/nextjs/server";
import { FilePenIcon, Globe, Mail, Phone } from "lucide-react";

const DoctorProfile = ({ user }:{ user: User }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] h-full py-6 gap-8 mx-10">
      <Card className="bg-foreground">
        <CardContent className="py-5 flex flex-col items-center gap-4">
          <div className="flex justify-between items-center gap-2">
            <Avatar className="h-20 w-20 border border-muted-foreground">
              <AvatarImage src={user.imageUrl} className="object-contain" />
            </Avatar>
            <div className="text-background">
              <h1 className="text-2xl font-bold">Dr. {user.fullName}</h1>
              <p>Cardiologist</p>
            </div>
            <Button variant="ghost" className="text-background gap-2">
              <FilePenIcon className="w-4 h-4 "> </FilePenIcon>
            </Button>
          </div>
          <div className="bg-muted-foreground w-full h-[2px] mt-2"></div>
          <div className="flex flex-col items-start gap-2 mt-4 w-full">
            <p className="text-sm text-muted-foreground text-start">About</p>
            <p className="text-background">
              {user.publicMetadata?.biography as string}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 mt-4 w-full">
            <p className="text-sm text-muted-foreground text-start">Contact</p>
            <p className="text-background flex justify-start items-center gap-2">
              <Mail className="w-5 h-5 text-muted-foreground" />
              {user.primaryEmailAddress.emailAddress}
            </p>
            <p className="text-background flex justify-start items-center gap-2">
              <Phone className="w-5 h-5 text-muted-foreground" />
              {user.primaryPhoneNumber?.phoneNumber || 'No phone number'}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 mt-4 w-full">
            <p className="text-sm text-muted-foreground text-start">Social</p>
            <p className="text-background flex justify-start items-center gap-2">
              <Icons.facebook
                color="#fff"
                className="h-5 w-5 cursor-pointer"
              ></Icons.facebook>
              <Icons.instagram
                color="#fff"
                className="h-5 w-5 cursor-pointer"
              ></Icons.instagram>
              <Icons.twitter
                color="#fff"
                className="h-5 w-5 cursor-pointer"
              ></Icons.twitter>
              <Icons.likedin
                color="#fff"
                className="h-5 w-5 cursor-pointer"
              ></Icons.likedin>
              <Globe className="h-5 w-5 text-background cursor-pointer"></Globe>
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <p>Professional information</p>
              <Button variant="ghost" className="gap-2">
                <FilePenIcon className="w-4 h-4 "> </FilePenIcon>
                Edit
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col items-start gap-2 mt-4 w-full">
              <p className="text-sm text-muted-foreground text-start">
                Medical License
              </p>
              <p>ABC123456</p>
            </div>
            <div className="flex flex-col items-start gap-2 mt-4 w-full">
              <p className="text-sm text-muted-foreground text-start">
                Specialty
              </p>
              <p>Cardiology</p>
            </div>
            <div className="flex flex-col items-start gap-2 mt-4 w-full">
              <p className="text-sm text-muted-foreground text-start">
                Education
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Medical Degree, Harvard Medical School, 2007</li>
                <li>Residency, Massachusetts General Hospital, 2011</li>
                <li>Fellowship, Cleveland Clinic, 2013</li>
              </ul>
            </div>
            <div className="flex flex-col items-start gap-2 mt-4 w-full">
              <p className="text-sm text-muted-foreground text-start">
                Consultory Address
              </p>
              <p>123 Main Street, Anytown USA 12345</p>
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <p>Experience</p>
                <Button variant="ghost" className="gap-2">
                  <FilePenIcon className="w-4 h-4 "> </FilePenIcon>
                  Edit
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col items-start gap-2 mt-4 w-full">
                <p className="text-sm text-muted-foreground text-start">
                  Internship
                </p>
                <p>Massachusetts General Hospital, 2007-2011</p>
              </div>
              <div className="flex flex-col items-start gap-2 mt-4 w-full">
                <p className="text-sm text-muted-foreground text-start">
                  Experience
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Cardiologist, Acme Medical Center, 2011-2016</li>
                  <li>Chief of Cardiology, Anytown Hospital, 2016-present</li>
                </ul>
              </div>
              <div className="flex flex-col items-start gap-2 mt-4 w-full">
                <p className="text-sm text-muted-foreground text-start">
                Organizational Associations
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>American College of Cardiology</li>
                  <li>American Heart Association</li>
                  <li>Society for Cardiovascular Angiography and Interventions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}

export default DoctorProfile;
