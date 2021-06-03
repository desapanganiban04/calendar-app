import { useState, useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

const AddTask = () => {
  const { addTasks } = useContext(TaskContext);
  const [form, setForm] = useState({
    title: "",
    date: "",
    status: false,
  });

  const handleOnChange = ({ target: { name, value } }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTasks(form);
  };

  return (
    <div className="flex items-center w-full">
      <div className="fixed pin bg-black opacity-75 z-10"></div>

      <div className="relative mx-6 md:mx-auto w-1/2 md:w-1/2 lg:w-1/3 z-20 m-8">
        <div className="shadow-lg bg-white rounded-lg p-8">
          <div className="flex justify-end mb-6">
            <button>
              <i className="fas fa-times mr-2 text-lg"></i>
            </button>
          </div>

          <h1 className="text-center text-2xl text-green-dark">New Task</h1>

          <form className="pt-6 pb-2 my-2" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="title">
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
              <label className="block text-sm font-bold mb-2" htmlFor="date">
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
              <label className="block text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 mb-3"
                id="status"
                name="status"
                value={form?.status ?? ""}
                onChange={handleOnChange}
              >
                <option value={true}>Completed</option>
                <option value={false}>Pending</option>
              </select>
            </div>
            <div className="block md:flex items-center justify-evenly">
              <div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded border-b-4 border-red-900"
                  type="button"
                >
                  Cancel
                </button>
              </div>

              <div>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded border-b-4 border-green-900"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
