import React from "react";
import QueryTable from "../../components/QueryTracking/QueryTable";

const page = () => {
  return (
    <>
      <div className=" flex justify-center pl-4 pr-4 items-center md:pl-32 md:pr-32 md:mt-10">
        <QueryTable />
      </div>
    </>
  );
};

export default page;
