import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";
import moment from "moment";
import ConfirmationModal from "./ConfirmationModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskDetail = (props) => {
  const history = useHistory();
  const { showTask, task, updateTask } = useContext(TaskContext);
  const [form, setForm] = useState({
    title: "",
    date: moment(task.date).format("l"),
    status: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    showTask(id);
  }, [id]);

  useEffect(() => {
    setForm({
      title: task?.title ?? "",
      date: task ? moment(task.date).format("l") : moment().format("l"),
      status: task?.status ?? false,
    });
  }, [task]);

  const handleOnChange = ({ target: { name, value } }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      date: moment(e).format("l"),
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTask(id, form, () => {
      history.push("/");
    });
  };

  const handleOnDelete = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="mt-4">
        <div className="bg-gray-600 rounded-md shadow-md">
          <div className="pt-4 pl-4">
            <Link to="/">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </Link>
          </div>

          <div className="flex h-96 justify-center">
            <form className="pt-6 pb-2 my-2 w-1/2" onSubmit={handleUpdate}>
              <div className="mb-4">
                <label
                  className="block text-xl font-bold mb-2 text-gray-300"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900"
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={form?.title ?? ""}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-xl font-bold mb-2 text-gray-300"
                  htmlFor="date"
                >
                  Date
                </label>
                <DatePicker
                  id="date"
                  name="date"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-900 w-full"
                  selected={
                    form ? moment(form.date).toDate() : moment().toDate()
                  }
                  onChange={handleDateChange}
                />
                {/* <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900"
                  type="date"
                  value={}
                  onChange={handleOnChange}
                /> */}
              </div>
              <div className="mb-6">
                <label
                  className="block text-xl font-bold mb-2 text-gray-300"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 mb-3"
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleOnChange}
                >
                  <option value="Done">Done</option>
                  <option value="On-going">On-going</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="block md:flex items-center justify-evenly">
                <div>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded border-b-4 border-red-900"
                    type="button"
                    onClick={handleOnDelete}
                  >
                    Delete
                  </button>
                </div>

                <div>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded border-b-4 border-green-900"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
            {openModal && (
              <ConfirmationModal handleCloseModal={handleCloseModal} />
            )}
          </div>
        </div>
      </div>

      {/* <div className="flex items-center w-full">
          <div className="fixed pin bg-black opacity-75 z-10"></div>

          <div className="relative mx-6 md:mx-auto w-1/2 md:w-1/2 lg:w-1/3 z-20 m-8">
            <div className="shadow-lg bg-white rounded-lg p-8">
              <Link to="/">
                <button className="bg-blue-50 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-blue-600 rounded-full hover:shadow-lg hover:bg-blue-100">
                  <i className="fas fa-chevron-left"></i>
                </button>
              </Link>
              <div className="flex justify-end mb-6">
                <button>
                  <i className="fas fa-times mr-2 text-lg"></i>
                </button>
              </div>
              <h1 className="text-center text-2xl text-green-dark">
                {task?.title ?? ""}
              </h1>
              <form className="pt-6 pb-2 my-2" onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900"
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={form?.title ?? ""}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900"
                    id="date"
                    name="date"
                    type="date"
                    value={form?.date ?? ""}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-sm font-bold mb-2"
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 mb-3"
                    id="status"
                    name="status"
                    value={form?.status ?? ""}
                    onChange={handleOnChange}
                  >
                    <option value="Done">Done</option>
                    <option value="On-going">On-going</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
                <div className="block md:flex items-center justify-evenly">
                  <div>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded border-b-4 border-red-900"
                      type="button"
                      onClick={handleOnDelete}
                    >
                      Delete
                    </button>
                  </div>

                  <div>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded border-b-4 border-green-900"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
        </div> */}
    </>
  );
};

export default TaskDetail;
