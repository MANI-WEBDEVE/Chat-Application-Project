import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  return (
    <div className="h-[10vh] border-b-[1px] border-[#2f303b] flex items-center py-2">
      <div className="flex gap-5 items-cneter">
        <div className="flex gap-3 items-center justify-center"></div>
        <div className="flex items-center justify-center gap-5">
          <button className="text-neutral-500 duration-300 transition-all focus:border-none focus:outline-none focus:text-white">
            <RiCloseFill className=" text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
