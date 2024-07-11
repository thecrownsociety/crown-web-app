import AddConsultingCallModal from "@/components/consultingCalls/AddConsultingCallModal";
import ConsultingCallsTable from "@/components/consultingCalls/ConsultingCallsTable";

const page = () => {
  return (
    <>
      <div className="flex justify-end pr-8  md:pr-28 mt-16">
        <AddConsultingCallModal />
      </div>

      <div className=" flex justify-center pl-4 pr-4 items-center md:pl-32 md:pr-32 md:mt-10">
        <ConsultingCallsTable />
      </div>
    </>
  );
};

export default page;
