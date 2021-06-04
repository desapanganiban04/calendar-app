import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";
import { isEmpty } from "lodash";
import moment from "moment";
import AddTask from "./AddTask";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const TaskList = () => {
  const { tasks, fetchTasks, filterTasks } = useContext(TaskContext);
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);
  const [dateSelected, setDateSelected] = useState(moment().toDate());

  useEffect(() => {
    fetchTasks();
  }, [location]);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleSearch = ({ target: { value } }) => {
    filterTasks({ filter: "title", value: value, action: "filter" });
  };

  const handleFilter = ({ target: { name, value } }) => {
    const filter = { filter: name, value: value, action: "filter" };
    filterTasks(filter);
  };

  const handleChangeDate = (e) => {
    console.log(e);
    setDateSelected(moment(e).toDate());
    const filter = {
      filter: "date",
      value: moment(e).format("l"),
      action: "filter",
    };
    filterTasks(filter);
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="mt-4">
        <div className="flex flex-col h-96 p-4 bg-gray-600 rounded-md shadow-md">
          <Calendar
            className="w-full h-full rounded"
            value={dateSelected}
            onChange={handleChangeDate}
          />
        </div>
      </div>
      <div className="my-4 mt-4 w-full">
        <section className="flex-initial items-center justify-center h-96 bg-gray-600 rounded-md shadow-md overflow-y-auto">
          <div className="p-3 m-3 bg-gray-800 rounded-md">
            <div className="my-2 flex sm:flex-row">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <select
                    name="status"
                    className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                    onChange={handleFilter}
                  >
                    <option value="All">All</option>
                    <option value="Done">Done</option>
                    <option value="On-going">On-going</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Search"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  onChange={handleSearch}
                />
              </div>
              <div className=" w-10 text-center bg-white rounded">
                <i
                  class="far fa-calendar-plus text-black text-2xl"
                  onClick={handleOpenModal}
                ></i>
              </div>
            </div>
          </div>
          {!isEmpty(tasks) ? (
            tasks.map((task) => (
              <Link to={`/${task.id}`} key={task.id}>
                <div className="flex items-center justify-center py-2">
                  <div className="max-w-lg w-80 rounded-lg shadow-lg p-4 bg-gray-800">
                    <h3 className="font-semibold text-lg tracking-wide text-gray-200">
                      {task.title}
                    </h3>
                    <span
                      className={`items-center justify-center px-2 py-1 mr-2 text-xs font-bold rounded-full ${
                        task.status === "Done"
                          ? " text-green-100 bg-green-600"
                          : task.status === "On-going"
                          ? "text-yellow-100 bg-yellow-600"
                          : "text-red-100 bg-red-600"
                      }`}
                    >
                      {task.status}
                    </span>
                    <div className="mt-2">
                      <span className=" text-gray-200">
                        {moment(task.date).format("L")}
                      </span>
                      {/* </a> */}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex items-center justify-center py-4">
              <h1 className=" text-white">No Task for today.</h1>
            </div>
          )}
        </section>
      </div>
      {openModal && <AddTask handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default TaskList;
