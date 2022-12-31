import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { googleAuthData } from "../store/UserSlice";

const GoogleAuthCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
      dispatch(googleAuthData(location.search))
    },[])

    if(isAuth) {
      navigate('/',{replace:true})
    }

  return (
    <div className="flex justify-center h-screen items-center">
      <p>Loading...</p>
    </div>
  )
}

export default GoogleAuthCallback;