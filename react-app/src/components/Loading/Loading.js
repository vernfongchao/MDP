import LoadingGif from "./loading.gif";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <h1>Loading...</h1>
      <img className="loading-img" src={LoadingGif} alt="Loading" />
    </div>
  );
};

export default Loading;
