import { useEffect, useState } from "react";
import { Instance } from "../utils/Instance";
import AddEvent from "../components/modal/AddEvent";
import { useCustomContext } from "../context/DataContext";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Delete from "../components/modal/Delete";
import { mapServiceEventType } from "../utils/serviceEventType";
import { TServiceEvent } from "../interfaces/types/serviceEvent.types";

export default function ServiceEvent() {
  const [serviceEvents, setServiceEvents] = useState<TServiceEvent[]>([]);
  const { setEditID, setIsEdit, setServiceToEdit } = useCustomContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectDeleteId, setSelectDeleteId] = useState("");
  useEffect(() => {
    const getServiceEvents = async () => {
      setIsLoading(true);
      try {
        const res = await Instance.get("/v1/service-event");
        setServiceEvents(res.data.serviceEvents);
        setError("");
        console.log("service-events", res);
      } catch (error: any) {
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    getServiceEvents();
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
    setServiceEvents((prev) =>
      prev.filter((event) => event.SERVICE_EVENT_CD !== selectDeleteId)
    );
  };

  const handleEdit = async (id: string) => {
    try {
      const updateService = await serviceEvents.find(
        (item) => item.SERVICE_EVENT_CD === id
      );
      setEditID(id);
      setIsEdit(true);
      if (updateService) {
        setServiceToEdit(updateService);
        // navigate("/service-event/create");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsEdit(false);
    setServiceToEdit(null);
    setEditID("");
  }, [location.pathname]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="relative top-0 bottom-0 h-full shadow-md sm:rounded-lg w-full">
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center w-full">
            <Loader color="text-blue-800" width="w-6" height="h-6" />
          </div>
        ) : (
          <>
            {isDeleteModalOpen && (
              <Delete
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                onDeleteSuccess={onDeleteSuccess}
                deleteUrl={`/v1/service/${selectDeleteId}`}
              />
            )}
            {isModalOpen && (
              <AddEvent
                setServiceEvents={setServiceEvents}
                setIsModalOpen={setIsModalOpen}
              />
            )}
            <div className="flex justify-between p-3">
              <h1 className="font-semibold text-xl">Service Event</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white w-24 py-1 rounded-lg font-semibold"
                type="button"
              >
                Add Event
              </button>
            </div>
            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100 h-full">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Code
                    </th>
                    <th scope="col" className="px-6 py-3 w-2/12">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 w-2/12 ">
                      Description (IN NEPALI)
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Disabled
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {serviceEvents &&
                    serviceEvents.length > 0 &&
                    serviceEvents.map((item) => (
                      <tr
                        key={item.SERVICE_EVENT_CD}
                        className="odd:bg-white even:bg-gray-50  border-b "
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.SERVICE_EVENT_CD}
                        </th>
                        <td className="px-6 py-4">{item.SERVICE_EVENT_DESC}</td>
                        <td className="px-6 py-4 font-[Preeti] text-lg">
                          {item.SERVICE_EVENT_DESC_NEP
                            ? item.SERVICE_EVENT_DESC_NEP
                            : "_"}
                        </td>
                        <td className="px-6 py-4">
                          {mapServiceEventType(item.SERVICE_EVENT_TYPE) || "_"}
                        </td>
                        <td className="px-6 py-4">{item.DISABLED}</td>
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
                              onClick={() => handleEdit(item.SERVICE_EVENT_CD)}
                              className="font-medium text-blue-600 cursor-pointer hover:underline"
                            >
                              Edit
                            </p>
                            <p
                              onClick={() =>
                                handleDelete(item.SERVICE_EVENT_CD)
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
