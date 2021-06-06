import { MdCancel } from "react-icons/md";

const VideoModal = ({ isShown, closeSelf, src }) => {
  return (
    isShown && (
      <div
        onClick={closeSelf}
        className="flex flex-col justify-center items-center w-screen h-screen fixed top-0 left-0 bg-darkGrey bg-opacity-95 z-30 transition-all duration-400"
      >
        <iframe
          className="w-full h-1/2 xl:w-8/12 xl:h-3/4"
          title="Introduction video"
          src={src}
          allowFullScreen
        />
        <button onClick={closeSelf}>
          <MdCancel className="flex-shrink-0 mt-4" color="#fff" size={50} />
        </button>
      </div>
    )
  );
};

export default VideoModal;
