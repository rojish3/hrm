import { useEffect, useState, useRef, RefObject } from "react";
import { Instance } from "../utils/Instance";
import Loader from "../components/Loader";
import Delete from "../components/modal/Delete";
import AddJobType from "../components/modal/AddJobType";
import { TJobType } from "../interfaces/types/jobType.type";

export default function JobType() {
  const [jobType, setJobType] = useState<TJobType[]>([]);
  // const { setEditID, setIsEdit, setServiceToEdit } = useCustomContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectDeleteId, setSelectDeleteId] = useState("");
  const [jobTypeToEdit, setJobTypeToEdit] = useState<TJobType>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const closeJobModalRef: RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        closeJobModalRef.current &&
        !closeJobModalRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
        setIsEdit(false);
        setJobTypeToEdit((prev) => {
          if (prev) {
            return {
              ...prev,
              job_type_cd: "",
              job_type_desc: "",
              tax: "Y",
              tax_percent: "",
              pf_allowed: "N",
              cit: "N",
              pay_generate: "N",
              grade_allowed: "N",
              single_rebate: "",
              married_rebate: "",
              disabled: "N",
            };
          }
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeJobModalRef, setIsModalOpen, setIsEdit, setJobTypeToEdit]);

  //Get all Job type data
  useEffect(() => {
    const getJobType = async () => {
      setIsLoading(true);
      try {
        const res = await Instance.get("/v1/job-type");
        setJobType(res.data.data);
        setError("");
      } catch (error: any) {
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    getJobType();
  }, []);

  const handleDelete = async (id: string) => {
    setIsDeleteModalOpen(true);
    setSelectDeleteId(id);
    // try {
    //   const res = await Instance.delete(`/v1/service/${id}`);
    //   setServiceEvents((prev) => {
    //     const filteredService = prev.filter(
    //       (event) => event.SERVICE_EVENT_CD !== id
    //     );
    //     return filteredService;
    //   });
    // } catch (error) {}
  };

  const onDeleteSuccess = () => {
    setJobType((prev) =>
      prev.filter((event) => event.job_type_cd !== selectDeleteId)
    );
  };

  const handleEdit = (id: string) => {
    const update = jobType.find((item) => item.job_type_cd === id);
    if (update) {
      setIsEdit(true);
      // setEditID(id);
      setJobTypeToEdit(update);
      setIsModalOpen(true);
    }
  };

  // useEffect(() => {
  //   setIsEdit(false);
  //   setServiceToEdit(null);
  //   setEditID("");
  // }, [location.pathname]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="relative top-0 bottom-0 h-full shadow-md sm:rounded-lg w-full">
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center w-screen">
            <Loader color="text-blue-800" width="w-6" height="h-6" />
          </div>
        ) : (
          <>
            {isDeleteModalOpen && (
              <Delete
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                // selectDeleteId={selectDeleteId}
                onDeleteSuccess={onDeleteSuccess}
                deleteUrl={`/v1/job-type/${selectDeleteId}`}
              />
            )}
            {isModalOpen && (
              <AddJobType
                setJobType={setJobType}
                setIsModalOpen={setIsModalOpen}
                jobTypeToEdit={jobTypeToEdit}
                closeJobModalRef={closeJobModalRef}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                setJobTypeToEdit={setJobTypeToEdit}
              />
            )}
            <div className="flex justify-between p-3">
              <h1 className="font-semibold text-xl">Job Type</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white w-32 py-1 rounded-lg font-semibold"
                type="button"
              >
                Add Job Type
              </button>
            </div>
            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100 h-full">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Code
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12 ">
                      Tax Applicable?
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Flat %
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      PF
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      CIT
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Pay Gen.
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Is Grade
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Single Rebate
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Married rebate
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Disable
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {jobType &&
                    jobType.length > 0 &&
                    jobType.map((item) => (
                      <tr
                        key={item.job_type_cd}
                        className="odd:bg-white even:bg-gray-50 border-b "
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item && item.job_type_cd}
                        </th>
                        <td className="px-6 py-4">
                          {item && item.job_type_desc}
                        </td>
                        <td className="px-6 py-4">{item && item.tax}</td>
                        <td className="px-6 py-4">
                          {item && item.tax_percent}
                        </td>
                        <td className="px-6 py-4">{item && item.pf_allowed}</td>
                        <td className="px-6 py-4">{item && item.cit}</td>
                        <td className="px-6 py-4">
                          {item && item.pay_generate}
                        </td>
                        <td className="px-6 py-4">
                          {item && item.grade_allowed}
                        </td>
                        <td className="px-6 py-4">
                          {item && item.single_rebate}
                        </td>
                        <td className="px-6 py-4">
                          {item && item.married_rebate}
                        </td>
                        <td className="px-6 py-4">{item && item.disabled}</td>

                        {/* <td className="px-6 py-4">{item.ENTERED_BY}</td>
        <td className="px-6 py-4">
          {dateConversion(item.ENTERED_DT)}
        </td> */}
                        {/* <td className="px-6 py-4">
          {item.IS_AUTO_SALARY_ADJUST || "_"}
        </td> */}
                        {/* <td className="px-6 py-4">{item.LAST_UPDATED_BY || "_"}</td>
        <td className="px-6 py-4">
          {(item.LAST_UPDATED_ON &&
            dateConversion(item.LAST_UPDATED_ON)) ||
            "_"}
        </td> */}
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-4">
                            <p
                              onClick={() =>
                                handleEdit(item && item.job_type_cd)
                              }
                              className="font-medium text-blue-600 cursor-pointer hover:underline"
                            >
                              Edit
                            </p>
                            <p
                              onClick={() =>
                                handleDelete(item && item.job_type_cd)
                              }
                              className="font-medium cursor-pointer text-red-600 hover:underline"
                            >
                              Delete
                            </p>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
