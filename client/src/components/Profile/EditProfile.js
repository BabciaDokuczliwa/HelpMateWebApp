import axios from "axios";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlinePhotoCamera } from "react-icons/md";

import noImg from "../../images/no-img.jpg";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/Context";

function EditProfile() {
  const { state, dispatch } = useContext(AppContext);
  const [fileData, setFiledata] = useState({
    url: "",
    file: null,
  });

  const [data, setData] = useState({
    username: state.user.username,
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    email: state.user.email,
    city: state.user.city,
    age: state.user.age,
    phonenumber: state.user.phonenumber,
    language: state.user.language,
    intro:state.user.intro,
    helpoffers:state.user.helpoffers,
  });

  const handleSave = async () => {
    const formdata = new FormData();

    formdata.set("username", data.username);
    formdata.set("email", data.email);
    formdata.set("city", data.city);
    formdata.set("age", data.age);
    formdata.set("phonenumber", data.phonenumber);
    formdata.set("language", data.language);
    formdata.set("intro", data.intro)
    formdata.set("helpoffers", data.helpoffers)
    console.log(data);
    // formdata.set("image", fileData.file, "profileImage");

    const config = {
      Headers: { "content-type": "multipart/form-data" },
    };
    console.log(formdata.email);
    const response = await axios.post("/users/profile", data, config);
    console.log("🚀 ~ handleSave ~ response", response);

    if (response.data.success)
      dispatch({
        type: "userSaved",
        payload: response.data.user,
      });
  };

  const handleImageChange = (e) => {
    console.log("🚀 ~ handleImageChange ~ e", e.currentTarget.files[0]);

    setFiledata({
      url: URL.createObjectURL(e.currentTarget.files[0]),
      file: e.currentTarget.files[0],
    });
  };

  return (
    <div className="bg-[#E3DDDD]">
      <div className="flex justify-start ml-[30px] max-w-[550px] min-w-[340px] md:w-3/4  lg:w-1/2  pt-8">
        <Link to="/home">
          <MdArrowBackIosNew className="hover:text-red-500 bg-white rounded-3xl text-[30px]" />
        </Link>
      </div>

      <div className="flex w-full h-full justify-center items-center gap-[15px] flex-col">
        <div className="relative">
          <img
            className="w-[150px] h-[150px] rounded-3xl mb-5 shadow-xl object-cover"
            src={fileData.url || noImg}
            alt="profilpicture"
          />
          <button className="absolute -top-3 bg-white border- rounded-3xl border-2 p-2 border-[#3B8A80] -right-3">
            <MdOutlinePhotoCamera className="text-[26px]" />
          </button>
        </div>

        <div className="grid-1 grid gap-x-10 md:grid-cols-2 lg:grid-cols-2">
          <div class="mb-6">
            <label
              for="Username"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              value={data.username}
              type="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 shadow-lg rounded-xl block w-full p-2.5 hover:border-[#feaa0c] focus:outline-[#3B8A80] "
              placeholder="username"
              onChange={(e) => setData({ ...data, username: e.target.value })}
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="firstname"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              First name
            </label>
            <input
              value={data.firstname}
              type="firstname"
              id="firstname"
              className="bg-gray-50 border border-gray-300 text-gray-900 shadow-lg rounded-xl block w-full p-2.5 hover:border-[#feaa0c] focus:outline-[#3B8A80] "
              placeholder="First name"
              onChange={(e) => setData({ ...data, firstname: e.target.value })}
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="lastname"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              value={data.lastname}
              type="lastname"
              id="lastname"
              className="bg-gray-50 border border-gray-300 text-gray-900 shadow-lg rounded-xl block w-full p-2.5 hover:border-[#feaa0c] focus:outline-[#3B8A80] "
              placeholder="Last name"
              onChange={(e) => setData({ ...data, lastname: e.target.value })}
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="email"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              value={data.email}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 shadow-lg rounded-xl block w-full p-2.5 hover:border-[#feaa0c] focus:outline-[#3B8A80] "
              placeholder="name@flowbite.com"
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="phonenumber"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              value={data.phonenumber}
              type="phonenumber"
              id="phonenumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 shadow-lg rounded-xl block w-full p-2.5 hover:border-[#feaa0c] focus:outline-[#3B8A80] "
              placeholder="your phone number"
              onChange={(e) =>
                setData({ ...data, phonenumber: e.target.value })
              }
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="city"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              value={data.city}
              type="city"
              id="city"
              className="bg-gray-50 border border-gray-300 text-gray-900 shadow-lg rounded-xl block w-full p-2.5 hover:border-[#feaa0c] focus:outline-[#3B8A80] "
              placeholder="your city"
              onChange={(e) => setData({ ...data, city: e.target.value })}
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="age"
              className="block mb-2 text-sm font-medium text-base text-gray-900 dark:text-white"
            >
              Age
            </label>
            <input
              value={data.age}
              type="age"
              id="age"
              className="bg-gray-50  text-gray-900 shadow-lg rounded-xl block w-full p-2.5 hover:border-[#feaa0c] focus:outline-[#3B8A80] "
              placeholder="your age"
              onChange={(e) => setData({ ...data, age: e.target.value })}
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="intro"
              className="block mb-2 text-base text-gray-900 font-medium dark:text-white"
            >
              Introduction
            </label>
            <textarea
              value={data.intro}
              type="language"
              id="language"
              rows="3"
              className="bg-gray-50  text-gray-900 shadow-lg rounded-xl block w-full p-2.5 hover:border-[#feaa0c] focus:outline-[#3B8A80] "
              placeholder="Introduce yourself :)"
              onChange={(e) => setData({ ...data, intro: e.target.value })}
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="language"
              className="block mb-2 text-base text-gray-900 font-medium dark:text-white"
            >
              Language skills
            </label>
            <textarea
              value={data.language}
              type="language"
              id="language"
              rows="3"
              className="bg-gray-50 text-gray-900 shadow-lg rounded-xl block w-full p-2.5 hover:border-[#feaa0c] focus:outline-[#3B8A80] "
              placeholder="Add your language skills here"
              onChange={(e) => setData({ ...data, language: e.target.value })}
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="helpoffers"
              className="block mb-2 text-base font-medium text-gray-900 dark:text-white"
            >
              Help offers
            </label>
            <textarea
              value={data.helpoffers}
              type="helpoffers"
              id="helpoffers"
              rows="3"
              className="bg-gray-50  text-gray-900 shadow-lg rounded-xl block w-full p-2.5 hover:border-[#feaa0c] focus:outline-[#3B8A80]  "
              placeholder="Share here some of your help offers"
              onChange={(e) => setData({ ...data, helpoffers: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="w-3/4 max-w-[150px] mb-12">
          <button
            onClick={handleSave}
            className="py-2 bg-[#3B8A80] shadow-xl w-full rounded-3xl 
              text-white font-bold hover:bg-[#70c2b7] active:bg-[#3d8f84]"
          >
            Update profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
