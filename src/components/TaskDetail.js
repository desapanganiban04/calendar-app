import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { useTaskDetail, useUpdateTask } from "../hooks";
import validate from "../formValidations/TaskFormValidationRules";

const TaskDetail = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, task] = useTaskDetail(id);
  const { data } = task;
  const [form, setForm] = useState({
    title: "",
    date: moment(),
    status: "",
  });
  const [update] = useUpdateTask();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm({
      title: data?.title ?? "",
      date: data?.date ?? moment(),
      status: data?.status ?? false,
    });
  }, [data?.date, data?.status, data?.title, loading]);

  const handleOnChange = ({ target: { name, value } }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setErrors(validate(form));
    let errorCount = Object.keys({}).length;
    errorCount = Object.keys(validate(form)).length;

    if (errorCount < 1) {
      update(id, form, () => {
        history.push("/");
      });
    }
  };

  return (
    <>
      <div className="mt-4">
        <div className="bg-gray-600 rounded-md shadow-md pb-4">
          <Link to="/">
            <div className="pt-4 pl-4">
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
            </div>
          </Link>
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
                <input
                  className={`${
                    errors.date && "border-2 border-red-500"
                  } shadow appearance-none border rounded py-2 px-3 text-gray-900 w-full`}
                  id="date"
                  name="date"
                  type="date"
                  value={form?.date ?? ""}
                  onChange={handleOnChange}
                />
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
                  value={form?.status ?? ""}
                  onChange={handleOnChange}
                >
                  <option value="done">Done</option>
                  <option value="on-going">On-going</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="block md:flex items-center justify-evenly">
                <div>
                  <Link to="/">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      type="button"
                    >
                      Cancel
                    </button>
                  </Link>
                </div>

                <div>
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetail;
