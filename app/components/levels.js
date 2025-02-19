import { getCategories } from "../_lib/data-services";
import Level from "./level_component";

async function Levels() {
  const categories = await getCategories();
  return (
    <div
      className=" relative w-full mx-auto px-4 sm:px-6 lg:px-12 py-12 bg-white"
      id="levels"
    >
      <h1 className=" text-gray-900  text-3xl font-bold pb-12 text-center lg:text-left lg:pl-8">
        Levels
      </h1>
      <div className="flex justify-around flex-col lg:flex-row xl:flex-row 2xl:flex-row">
        {categories.map((c) => {
          return (
            <Level
              level={c.cat_name}
              color={"bg-sky-500"}
              id={c.id}
              key={c.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Levels;
