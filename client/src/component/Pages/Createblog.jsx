import React, { useState } from 'react'
import { Createpost,  GetalluserBlog } from '../../services/httpService';

function Createblog({ setBlogs }) {

    const [post, setPost] = useState({
        title: "",
        description: ""
    });
    const [success, setSuccess] = useState('');
    const handlePostchange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("User Not authenticated. No token found.");
            return;
        }
        let title = post.title;
        let description = post.description;

        try {
            const response = await Createpost(token, title, description);
            console.log("Blog Status:", response.message);
            setPost({
                title: "",
                description: ""
            })
            setSuccess(response.message);
            const finalresponse = await GetalluserBlog(token);
            const sortedBlogs = finalresponse.sort((a, b) => b.id - a.id);
            setBlogs(sortedBlogs);
        } catch (error) {
            console.error("Blog post failed:", error.response ? error.response.data : error.message);
        }
    }
    return (
        <div >

            <div className='col-md-6 justify-items-center' style={styles.container}>

                <h2>Create a blog</h2>

                <div class=" create">
                    <form onSubmit={handleSubmit}>
                    {success && <p style={{ color: 'green' }}>{success}</p>} 
                        <div class="form-group py-2">
                            <label for="formGroupExampleInput" className='py-2'>Title</label>
                            <input type="text"  class="form-control" id="formGroupExampleInput" placeholder="Blog Title"
                            name='title'  value={post.title} required onChange={(e) => handlePostchange(e)} />
                        </div>
                        <div class="form-group pt-2">
                            <label for="formGroupExampleInput2" className='pb-1' >Description</label>
                            <textarea type="text" class="form-control" id="formGroupExampleInput2" placeholder="Blog Description" 
                            name='description' value={post.description} onChange={(e) => handlePostchange(e)} />
                        </div>
                        <div class="form-group row mt-3">
                            <div class="col-sm-10">
                                <button type="submit" class="btn btn-primary">Post </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}
const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
        justifyItems: "center",
    }

};
export default Createblog