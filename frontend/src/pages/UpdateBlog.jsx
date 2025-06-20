import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import JoditEditor from 'jodit-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setBlog } from '@/redux/blogSlice'
import CreatableSelect from 'react-select/creatable'

const UpdateBlog = () => {
    const editor = useRef(null);
    const [loading, setLoading] = useState(false)
    const [publish, setPublish] = useState(false)
    const params = useParams()
    const id = params.blogId
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { blog } = useSelector(store => store.blog)
    const selectBlog = blog.find(blog => blog._id === id)
    const [content, setContent] = useState(selectBlog.description)

    const [blogData, setBlogData] = useState({
        title: selectBlog?.title,
        subtitle: selectBlog?.subtitle,
        description: content,
        category: { label: selectBlog?.category, value: selectBlog?.category },
    })
    const [previewThumbnail, setPreviewThumbnail] = useState(selectBlog?.thumbnail)

    const handleChange = (e) => {
        const { name, value } = e.target
        setBlogData(prev => ({ ...prev, [name]: value }))
    }

    const categoryOptions = [
        { value: "Web Development", label: "Web Development" },
        { value: "Digital Marketing", label: "Digital Marketing" },
        { value: "Blogging", label: "Blogging" },
        { value: "Photography", label: "Photography" },
        { value: "Cooking", label: "Cooking" },
    ]

    const selectCategory = (selected) => {
        setBlogData(prev => ({ ...prev, category: selected }))
    }

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setBlogData(prev => ({ ...prev, thumbnail: file }))
            const reader = new FileReader()
            reader.onloadend = () => setPreviewThumbnail(reader.result)
            reader.readAsDataURL(file)
        }
    }

    const updateBlogHandler = async () => {
        const formData = new FormData()
        formData.append("title", blogData.title)
        formData.append("subtitle", blogData.subtitle)
        formData.append("description", content)
        formData.append("category", blogData.category?.value || "")
        formData.append("file", blogData.thumbnail)

        try {
            setLoading(true)
            const res = await axios.put(`https://blog-site-6od5.onrender.com/api/v1/blog/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })

            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const togglePublishUnpublish = async (action) => {
        try {
            const res = await axios.patch(`https://blog-site-6od5.onrender.com/api/v1/blog/${id}`, {
                params: { action },
                withCredentials: true
            })
            if (res.data.success) {
                setPublish(!publish)
                toast.success(res.data.message)
                navigate(`/dashboard/your-blog`)
            } else {
                toast.error("Failed to update")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBlog = async () => {
        try {
            const res = await axios.delete(`https://blog-site-6od5.onrender.com/api/v1/blog/delete/${id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedBlogData = blog.filter(item => item?._id !== id)
                dispatch(setBlog(updatedBlogData))
                toast.success(res.data.message)
                navigate('/dashboard/your-blog')
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    return (
        <div className='pb-10 px-3 pt-20 md:ml-[320px]'>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="w-full bg-white dark:bg-gray-800 p-5 space-y-2">
                    <h1 className=' text-4xl font-bold '>Basic Blog Information</h1>
                    <p>Make changes to your blogs here. Click publish when you're done.</p>
                    <div className="space-x-2">
                        <Button onClick={() => togglePublishUnpublish(selectBlog.isPublished ? "false" : "true")}>
                            {selectBlog?.isPublished ? "UnPublish" : "Publish"}
                        </Button>
                        <Button variant="destructive" onClick={deleteBlog}>Remove Blog</Button>
                    </div>

                    <div className='pt-10'>
                        <Label>Title</Label>
                        <Input type="text" placeholder="Enter a title" name="title" value={blogData.title} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input type="text" placeholder="Enter a subtitle" name="subtitle" value={blogData.subtitle} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <JoditEditor
                            ref={editor}
                            value={blogData.description}
                            onChange={newContent => setContent(newContent)}
                        />
                    </div>
                    <div>
                        <Label>Category</Label>
                        <div className="mt-2 dark:text-black">
                            <CreatableSelect
                                isClearable
                                options={categoryOptions}
                                onChange={selectCategory}
                                value={blogData.category}
                                placeholder="Select or create a category"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Thumbnail</Label>
                        <Input
                            id="file"
                            type="file"
                            onChange={selectThumbnail}
                            accept="image/*"
                            className="w-fit"
                        />
                        {previewThumbnail && (
                            <img src={previewThumbnail} className="w-64 my-2" alt="Blog Thumbnail" />
                        )}
                    </div>
                    <div className='flex gap-3'>
                        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                        <Button onClick={updateBlogHandler}>
                            {loading ? "Please Wait" : "Save"}
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UpdateBlog
