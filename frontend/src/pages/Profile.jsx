import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userLogo from "../assets/user.jpg";
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import TotalProperty from "@/components/TotalProperty";

const Profile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    occupation: user?.occupation,
    bio: user?.bio,
    facebook: user?.facebook,
    linkedin: user?.linkedin,
    github: user?.github,
    instagram: user?.instagram,
    file: user?.photoUrl,
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const formatURL = (url) => {
    if (!url) return "";
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("bio", input.bio);
    formData.append("occupation", input.occupation);
    formData.append("facebook", formatURL(input.facebook));
    formData.append("linkedin", formatURL(input.linkedin));
    formData.append("instagram", formatURL(input.instagram));
    formData.append("github", formatURL(input.github));
    if (input?.file) {
      formData.append("file", input?.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `https://blog-site-6od5.onrender.com/api/v1/user/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setOpen(false);
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 md:ml-[320px] min-h-screen">
      <div className="max-w-6xl mx-auto mt-8">
        <Card className="flex flex-col md:flex-row gap-10 p-4 md:p-10 dark:bg-gray-800 mx-2 md:mx-0">
          {/* image section */}
          <div className="flex flex-col items-center justify-center w-full md:w-[400px]">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-2">
              <AvatarImage src={user?.photoUrl || userLogo} />
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              {user?.occupation || "Mern Stack Developer"}
            </h1>
           <div className="flex gap-4 items-center justify-center">
  {user?.facebook && (
    <a href={formatURL(user?.facebook)} target="_blank" rel="noopener noreferrer">
      <FaFacebook className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    </a>
  )}
  {user?.linkedin && (
    <a href={formatURL(user?.linkedin)} target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    </a>
  )}
  {user?.github && (
    <a href={formatURL(user?.github)} target="_blank" rel="noopener noreferrer">
      <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    </a>
  )}
  {user?.instagram && (
    <a href={formatURL(user?.instagram)} target="_blank" rel="noopener noreferrer">
      <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
    </a>
  )}
</div>

          </div>

          {/* info section */}
          <div className="w-full">
            <h1 className="font-bold text-center md:text-start text-3xl md:text-4xl mb-5">
              Welcome {user?.firstName}!
            </h1>
            <p className="mb-3 text-center md:text-left">
              <span className="font-semibold">Email: </span>
              {user?.email}
            </p>

            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <Label className="">About Me</Label>
              <p className="border dark:border-gray-600 p-4 w-full md:w-96 min-h-[5rem] max-h-[20rem] overflow-y-auto rounded-lg scroll-on-hover">
                {user?.bio || "Please update Bio"}
              </p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)}>Edit Profile</Button>
              <DialogContent className="w-full max-w-md mx-auto p-4 max-h-[90vh] overflow-y-auto scrollbar-hidden scrollbar-on-hover">
                <DialogHeader>
                  <DialogTitle className="text-center text-xl">
                    Edit Profile
                  </DialogTitle>
                  <DialogDescription className="text-center text-sm">
                    Make changes to your profile here.
                  </DialogDescription>
                </DialogHeader>

                <form
                  className="w-full space-y-3 mt-2"
                  onSubmit={submitHandler}
                >
                  {/* First + Last Name */}
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="w-full">
                      <Label>First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={input.firstName}
                        onChange={changeEventHandler}
                        placeholder="First Name"
                        className="w-full text-gray-500"
                      />
                    </div>
                    <div className="w-full">
                      <Label>Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={input.lastName}
                        onChange={changeEventHandler}
                        placeholder="Last Name"
                        className="w-full text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Occupation */}
                  <div>
                    <Label>Occupation</Label>
                    <Input
                      id="occupation"
                      name="occupation"
                      value={input.occupation}
                      onChange={changeEventHandler}
                      placeholder="e.g. Mern Stack Developer"
                      className="w-full text-gray-500"
                    />
                  </div>

                  {/* Socials */}
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="w-full">
                      <Label>Facebook</Label>
                      <Input
                        id="facebook"
                        name="facebook"
                        value={input.facebook}
                        onChange={changeEventHandler}
                        placeholder="Facebook URL"
                        className="w-full text-gray-500"
                      />
                    </div>
                    <div className="w-full">
                      <Label>Instagram</Label>
                      <Input
                        id="instagram"
                        name="instagram"
                        value={input.instagram}
                        onChange={changeEventHandler}
                        placeholder="Instagram URL"
                        className="w-full text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="w-full">
                      <Label>LinkedIn</Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={input.linkedin}
                        onChange={changeEventHandler}
                        placeholder="LinkedIn URL"
                        className="w-full text-gray-500"
                      />
                    </div>
                    <div className="w-full">
                      <Label>Github</Label>
                      <Input
                        id="github"
                        name="github"
                        value={input.github}
                        onChange={changeEventHandler}
                        placeholder="Github URL"
                        className="w-full text-gray-500"
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={input.bio}
                      onChange={changeEventHandler}
                      placeholder="Enter a short bio..."
                      className="w-full text-gray-500"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <Label>Profile Picture</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={changeFileHandler}
                      className="w-full"
                    />
                  </div>

                  {/* Submit Button */}
                  <DialogFooter className="pt-2">
                    {loading ? (
                      <Button type="button" disabled>
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                        Please wait
                      </Button>
                    ) : (
                      <Button type="submit">Save Changes</Button>
                    )}
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div>
      <TotalProperty />
    </div>
  );
};

export default Profile;
