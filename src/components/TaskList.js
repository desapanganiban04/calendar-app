import { isEmpty } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetList, useStickyState } from "../hooks";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import Pagination from "./Pagination";

const INIT_STATE = {
  date: "",
  title: "",
  status: "",
};

const DEFAULT_FILTER = {
  page: 1,
  limit: 5,
};

function TaskList() {
  const [filter, setFilter] = useState(INIT_STATE);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState();
  const [defaultFilter, setDefaultFilter] = useStickyState(
    DEFAULT_FILTER,
    "filter"
  );
  const [, list, currentPage] = useGetList(defaultFilter);

  const handleChangePage = (value) => {
    setDefaultFilter({ ...defaultFilter, page: value });
  };

  const handleOnChange = ({ target: { name, value } }) => {
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setDefaultFilter({
      ...defaultFilter,
      ...filter,
      page: 1,
    });
  };

  const handleOpenAddModal = () => {
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenDeleteModal = (id) => {
    setToBeDeleted(id);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleOnResetFilterCallBack = () => {
    setDefaultFilter(DEFAULT_FILTER);
    setFilter(INIT_STATE);
  };

  const handleOnRetainFilterCallBack = () => {
    setDefaultFilter({
      ...defaultFilter,
      ...filter,
    });
  };

  useEffect(() => {
    setFilter({
      ...defaultFilter,
    });
  }, [defaultFilter]);

  return (
    <div className="grid my-4 mt-4">
      <section className="flex-initial items-center justify-center bg-gray-400 rounded-md shadow-md pt-1">
        <div className="p-3 m-3 bg-gray-800 rounded-md">
          <div className="my-2 flex sm:flex-row flex-col justify-center">
            <form onSubmit={handleOnSubmit} className="flex text-center">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select
                    name="limit"
                    className="appearance-none h-full rounded-l border block w-full lg:w-auto bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={handleOnChange}
                    value={filter?.limit ?? 5}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
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
                    className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full sm:w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
                    onChange={handleOnChange}
                    value={filter?.status ?? ""}
                  >
                    <option value="">All</option>
                    <option value="done">Done</option>
                    <option value="on-going">On-going</option>
                    <option value="pending">Pending</option>
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
              <div className="relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="title"
                  name="title"
                  className="h-full appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full sm:w-36 md:w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  onChange={handleOnChange}
                  value={filter?.title ?? ""}
                />
              </div>
              <div className="relative">
                <input
                  className="h-full appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full sm:w-36 md:w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  id="date"
                  name="date"
                  type="date"
                  value={filter?.date ?? moment()}
                  onChange={handleOnChange}
                />
              </div>
              <div className="relative">
                <input
                  type="submit"
                  value="Filter"
                  className="h-full appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </div>
            </form>
            <div className="relative w-10 text-center bg-white rounded">
              <i
                className="far fa-plus-square text-black font-bold text-center text-2xl"
                onClick={handleOpenAddModal}
              ></i>
            </div>
          </div>
        </div>

        <div className="flex-none h-80 md:h-72 overflow-y-auto">
          {!isEmpty(list) ? (
            list.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-center py-2"
              >
                <div className="max-w-lg w-80 rounded-lg shadow-lg p-4 bg-gray-800">
                  <div className="text-right">
                    <i
                      className="fas fa-times-circle text-red-600 hover:text-red-400 text-lg cursor-pointer "
                      onClick={() => handleOpenDeleteModal(task.id)}
                    ></i>
                  </div>
                  <Link to={`/${task.id}`}>
                    <div>
                      <h3 className="font-semibold text-lg tracking-wide text-gray-200 capitalize">
                        {task.title}
                      </h3>
                      <span
                        className={`items-center justify-center px-2 py-1 mr-2 text-xs font-bold rounded-full ${
                          task.status === "done"
                            ? " text-green-100 bg-green-600"
                            : task.status === "on-going"
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
                      </div>
                    </div>
                  </Link>
                </div>
                {openDeleteModal && (
                  <DeleteTask
                    handleCloseModal={handleCloseDeleteModal}
                    callBack={handleOnRetainFilterCallBack}
                    selected={toBeDeleted}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-4">
              <h1 className=" text-white">No Task for today.</h1>
            </div>
          )}
        </div>
        <Pagination page={currentPage} onChange={handleChangePage} />
      </section>
      {openAddModal && (
        <AddTask
          handleCloseModal={handleCloseAddModal}
          callBack={handleOnResetFilterCallBack}
        />
      )}
    </div>
  );
}

export default TaskList;
