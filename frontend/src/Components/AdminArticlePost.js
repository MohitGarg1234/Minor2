import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from "../context/userContext";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar'
import { FaTrash } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";

const AdminArticlePost = () => {
  const { currentUserId } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [articles, setArticles] = useState([]);
  const token = localStorage.getItem("token");
  const author = currentUserId;

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleDelete = async (articleId) => {
    console.log("Deleting article with ID:", articleId);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/admin/deletePost/${articleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete article');
      }
  
      // Remove the deleted article from the state
      const newArticles = articles.filter(article => article._id !== articleId);
      setArticles(newArticles);
      
    } catch (error) {
      console.error('Error deleting article:', error.message);
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("author", author);
      if (image) {
        formData.append("image", image);
      }
      const authorModel = "Admin";
      formData.append("authorModel", authorModel);
      const response = await fetch("http://127.0.0.1:5000/api/admin/addPost", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add article");
      }
      setContent("");
      setImage(null);
      toggleModal();
      fetchArticles();
    } catch (error) {
      console.error("Error adding article:", error.message);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/admin/getPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      setArticles(data.articles.map(article => ({
        ...article,
        like: Array.isArray(article.reactions) && article.reactions.some(reaction => reaction.user === currentUserId && reaction.type === 'like'),
        dislike: Array.isArray(article.reactions) && article.reactions.some(reaction => reaction.user === currentUserId && reaction.type === 'dislike'),
        author: {
          ...article.author // Ensure the author object remains intact
        }
      })));
    } catch (error) {
      console.error("Error fetching articles:", error.message);
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line
  }, []);

  const handleReact = async (index, articleId, reactionType) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/${articleId}/react/${currentUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reactionType })
      });
      if (!response.ok) {
        throw new Error(`Failed to ${reactionType} article`);
      }
      const updatedArticle = await response.json();
      const newArticles = [...articles];
      newArticles[index] = updatedArticle.article;
      setArticles(newArticles);
    } catch (error) {
      console.error(`Error ${reactionType} article:`, error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className='w-1/6'>
      <AdminSidebar />
      </div>
        <div
  className="flex-1 p-10 bg-gray-100"
  style={{
    backgroundColor: "#8EC5FC",
    backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
  }}
>
        <div className="bg-gray-100 min-h-screen pb-4" style={{
    backgroundColor: "#8EC5FC",
    backgroundImage: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
  }}>
          <div className="flex justify-center pb-4">
            <button
              onClick={toggleModal}
              className="px-6 py-2.5 bg-[#4c38a9]  text-white font-medium text-s leading-tight uppercase rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add Post
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" >
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-md w-full max-h-full overflow-y-auto" style={{ backgroundColor: "rgb(233 229 197)" }}
              >
                <div className="flex justify-between py-4 text-blue-800 border-b-slate-400 border-b-2 mx-4">
                  <span className="text-lg font-medium text-blue-800 dark:text-white ">
                    New Post
                  </span>
                  <RxCross2
                    size={23}
                    className="mt-2 cursor-pointer hover:text-black "
                    onClick={toggleModal}
                  />
                </div>

                <form className="p-6" onSubmit={handleSubmit} >
                  <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-white">Article Description</label>
                    <textarea
                      id="description"
                      rows="4"
                      className="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Write your article here..."
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-white">Upload Image</label>
                    <input
                      id="image"
                      type="file"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        className="mt-2 w-full h-auto rounded-lg"
                        alt="Uploaded"
                      />
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add New Post
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 md:grid-cols-2" >
              {articles.map((article, index) => (
                <div key={index} className="w-full md:w-5/6 lg:w-11/12 bg-[#f3e5f3] rounded-lg shadow-md overflow-hidden my-2" >
                  <div className="p-4">
                  <div className="flex justify-between items-center mb-4 border-b-gray-400 border-b-2">
                    <div className="flex items-center mb-2">
                      <img
                        className="w-10 h-10 rounded-full mr-4"
                        src={article.author.image}
                        alt="Author"
                      />
                      <div>
                        <h5 className="text-lg font-medium">{article.author.name}</h5>
                      </div>
                    </div>
                    <FaTrash
                    onClick={() => handleDelete(article._id)}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    size={18} // Adjust the size as needed
                    />
                  </div>
                    <p className="text-gray-700">{article.content}</p>
                    {article.image && (
                      <img
                        className="mt-4 w-full h-64 object-cover rounded-lg"
                        src={`http://127.0.0.1:5000/uploads/${article.image}`}
                        alt="Article"
                      />
                    )}
                    <div className="flex mt-4 items-center">
                      <button
                        onClick={() => handleReact(index, article._id, 'like')}
                        className={`mr-2 text-2xl ${article.likes ? "text-blue-500" : "text-gray-500"}`}
                      >
                        <FaThumbsUp />
                      </button>
                      <span className="mr-2">{article.likes}</span>
                      <button
                        onClick={() => handleReact(index, article._id, 'dislike')}
                        className={`ml-2 text-2xl ${article.dislikes ? "text-red-500" : "text-gray-500"}`}
                      >
                        <FaThumbsDown />
                      </button>
                      <span className="ml-2">{article.dislikes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>

    </div>
  )
}

export default AdminArticlePost
