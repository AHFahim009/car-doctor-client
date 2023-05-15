import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context-Provider/AuthProvider";

const Login = () => {
  //---------------

  const { singIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    //* [ firebase login with email & password  / when user login successfully send logged user data to server site ("/jwt") for generated token  & (res.send)=> jwt token  / set this token in local storage / finally  navigated redirect location  ]

    singIn(email, password)
      .then((result) => {
        const user = result.user;
        const loggedUser = {
          email: user.email,
        };
        console.log(loggedUser);

        // [sending user data to server site "/jwt" & res.send => token ]

        fetch("http://localhost:5000/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loggedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("jwt response", data);

            // set token data in local storage =>
            // step 1: setItem

            localStorage.setItem("car-access-token", data.token);
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.log(error);
      });
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
        <div className=" w-full lg:w-1/2">
          <h1 className="text-center text-4xl mb-4">Please Login</h1>
          <div className=" shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <form onSubmit={handleLogin}>
              <div className="mb-6">
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
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-xl font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  type="password"
                  placeholder="password"
                  required
                />
                <p className="text-red-500 text-xl italic"></p>
              </div>
              <div className="flex flex-col-reverse gap-2 lg:flex-row items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Log In
                </button>
                <p
                  className="inline-block align-baseline font-bold text-sm tracking-wide"
                  href="#"
                >
                  If you have no an account ?
                  <Link className="underline text-blue-500 ms-1" to="/signUp">
                    Register
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

export default Login;
