import Logo from "../assets/logo.svg";

const Login = () => {
    return (
        <div className="max-w-lg mx-auto p-6">
            <img className="w-20" src={Logo} alt="Profile" />
            <h1 className="text-2xl font-bold mb-8 mt-16">Login</h1>
            <div
                onClick={() =>
                    (window.location = `${
                        import.meta.env.VITE_BASE_URL
                    }/api/connect/google`)
                }
                className="flex border cursor-pointer border-gray-400 justify-center mx-auto max-w-md gap-6 px-6 py-3 rounded-full"
            >
                <button>Login with google</button>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/300/300221.png?w=360&t=st=1672634280~exp=1672634880~hmac=cfe248f48d7a6e767d075594899e2beb2f22582c5eba53f546f837e5e5cb8b65"
                    width={30}
                    className="object-contain"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Login;
