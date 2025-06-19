import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setBlog } from "@/redux/blogSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CreatableSelect from "react-select/creatable";

const CreateBlog = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);
  const { blog } = useSelector((store) => store.blog);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Blogging", label: "Blogging" },
    { value: "Photography", label: "Photography" },
    { value: "Cooking", label: "Cooking" },
  ];

  const createBlogHandler = async () => {
    if (!title || !category) {
      toast.error("Please enter title and category");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8000/api/v1/blog/`,
        {
          title,
          category: category.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setBlog([...blog, res.data.blog]));
        navigate(`/dashboard/write-blog/${res.data.blog._id}`);
        toast.success(res.data.message);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:pr-20 h-screen md:ml-[320px] pt-20">
      <Card className="md:p-10 p-4 dark:bg-gray-800">
        <h1 className="text-2xl font-bold">Let's create a blog</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Share your knowledge, stories, and experiences with the world. Choose
          a category, give your blog a compelling title, and start writing
          content that inspires, educates, or entertains your readers.
        </p>
        <div className="mt-10">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Your Blog Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white dark:bg-gray-700"
            />
          </div>

          <div className="mt-4 mb-5">
            <Label>Category</Label>
            <div className="mt-1">
              <CreatableSelect
                isClearable
                options={categoryOptions}
                onChange={(selected) => setCategory(selected)}
                value={category}
                placeholder="Select or create a category"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button disabled={loading} onClick={createBlogHandler}>
              {loading ? (
                <>
                  <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CreateBlog;
