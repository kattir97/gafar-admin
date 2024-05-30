import { Link, Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <>
      <div className="h-12 border-b  flex justify-start items-center pl-5">
        <Link to={"/home"}>
          <span className="text-xl font-bold ">Gafar Admin </span>
        </Link>
      </div>
      <div className="flex justify-center py-5  min-h-[90vh]">
        <div className="w-2/3 my-0 mx-auto border-1 border-inherit border-solid rounded">
          <Outlet />
        </div>
      </div>
    </>
  );
};
