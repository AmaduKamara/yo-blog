import { useState, useEffect } from "react";
// import { ReactTagInput } from "@pathofdev/react-tag-input";
import { WithContext as ReactTags } from "react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const initialState = {
  title: "",
  tags: [],
  trending: "",
  category: "",
  description: "",
};

const categories = [
  "Fashion",
  "Technology",
  "Programming",
  "Food",
  "Sport",
  "Education",
  "Entertainment",
  "Business",
];

const AddEditBlog = () => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { title, tags, category, trending, description } = form;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setForm((prev) => ({ ...prev, imageUrl: downloadUrl }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.vale });
  };

  const handleTags = () => {};

  const handleTrending = () => {};

  const onCategoryChange = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-16 w-[700px] mx-auto border bg-white rounded-md p-6">
      <h1 className="text-center text-xl md:text-2xl font-semibold">
        Create Blog
      </h1>
      <form className="mt-10" onSubmit={handleSubmit}>
        <div>
          <input
            type="title"
            name="title"
            value={title}
            placeholder="Title"
            onChange={handleChange}
            className="mb-4 py-4 px-3 rounded-md border focus:outline-cyan-600 w-full"
          />
        </div>
        <div>
          <ReactTags tags={tags} placeholder="Tags" onChange={handleTags} />
        </div>
        <div className="mt-4">
          <p>Is it trending blog?</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center mr-5">
              <input
                type="radio"
                name="radioOption"
                value="yes"
                onChange={handleTrending}
                checked={trending === "yes"}
                className="rounded-md border focus:outline-cyan-600 mr-3"
              />
              <label htmlFor="radioOption">Yes</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="radioOption"
                value="no"
                onChange={handleTrending}
                checked={trending === "no"}
                className="rounded-md border focus:outline-cyan-600 mr-3"
              />
              <label htmlFor="radioOption">No</label>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <select
            value={category}
            onChange={onCategoryChange}
            className="mb-4 py-4 px-3 rounded-md focus:outline-cyan-600 w-full border"
          >
            <option>Please select a category</option>
            {categories.map((category, index) => (
              <option value={category || ""} key={index}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mt-4">
          <textarea
            rows="5"
            className="py-4 px-3 rounded-md focus:outline-cyan-600 w-full border"
            placeholder="Blog description..."
            value={description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="w-full mt-4">
          <input
            type="file"
            className="py-4 px-3 rounded-md focus:outline-cyan-600 w-full border"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="w-full mt-4">
          <button
            type="submit"
            className="py-3 w-full rounded-md bg-cyan-500 hover:bg-cyan-700 text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditBlog;
