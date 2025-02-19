import { GraduationCap } from "lucide-react";
import Link from "next/link";

function Level({ level, color, id }) {
  return (
    <Link
      href={`/courses/${id}`}
      className={`group border-black border-opacity-10 border-[1px] px-14 py-8 rounded-lg flex justify-center items-center flex-col mb-5 lg:mb-0 hover:bg-blue-600 transition cursor-pointer shadow-lg  `}
    >
      <div
        className={`${color} group-hover:bg-white rounded-full w-20 h-20 flex justify-center items-center bg-opacity-15 `}
      >
        <GraduationCap className="text-blue-600 group-hover:text-blue-600" />
      </div>
      <h1 className="text-black font-bold pt-8 text-center text-xl group-hover:text-white">
        {level}
      </h1>
    </Link>
  );
}

export default Level;
