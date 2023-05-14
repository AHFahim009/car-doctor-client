import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context-Provider/AuthProvider";

const SignUp = () => {
  //----------------
  const { createUser } = useContext(AuthContext);

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });

    // const form = event.target;
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row gap-24 ">
        <div className=" w-full lg:w-1/2">
          <img
            src="https://raw.githubusercontent.com/AHFahim009/image-resources/bbb1912e956e44ccdd6af9101326179c718d50b4/car-doctor/images/login/login.svg"
            alt=""
          />
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="text-center text-4xl mb-4">Please Register</h1>
          <div className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="text"
                >
                  Your Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="email"
                >
                  Photo URL
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="photo"
                  placeholder=""
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="password"
                  required
                />
                {/* display error success massage */}
                <p className="text-red-500 text-xs italic"></p>
                <p className="text-red-500 text-xs italic"></p>
              </div>
              <div className="flex flex-col-reverse gap-2 lg:flex-row  items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
                <p
                  className="inline-block align-baseline font-bold text-sm t"
                  href="#"
                >
                  Already have an account ?
                  <Link className="text-blue-500 underline ms-1" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
