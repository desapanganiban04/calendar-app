import { useState } from "react";
import { useAddTask } from "../hooks";
import validate from "../formValidations/TaskFormValidationRules";

const AddTask = ({ handleCloseModal, callBack }) => {
  const [submit] = useAddTask();
  const [form, setForm] = useState({
    title: "",
    date: "",
    status: false,
  });
  const [errors, setErrors] = useState({});

  const handleOnChange = ({ target: { name, value } }) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(form));
    let errorCount = Object.keys({}).length;
    errorCount = Object.keys(validate(form)).length;

    if (errorCount < 1) {
      submit(form, () => {
        callBack();
        handleCloseModal();
      });
    }
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  return (
    <div className="h-full w-full bg-black bg-opacity-50 flex flex-col items-center justify-center absolute z-50 inset-0">
      <div className="bg-white rounded shadow-2xl p-8 m-4 max-w-sm lg:w-96 max-h-full border-gray-200">
        <form className="pt-6 pb-2 my-2" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className={`${
                errors.title && "border-2 border-red-500"
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-900`}
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              value={form?.title ?? ""}
              onChange={handleOnChange}
            />
            {errors.title && (
              <span className="justify-start block text-sm font-bold mb-2 text-red-500">
                {errors.title}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="date">
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
            {errors.date && (
              <span className="justify-start block text-sm font-bold mb-2 text-red-500">
                {errors.date}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select
              className={`${
                errors.status && "border-2 border-red-500"
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 mb-3`}
              id="status"
              name="status"
              value={form?.status ?? ""}
              onChange={handleOnChange}
            >
              <option value={""}></option>
              <option value={"done"}>Done</option>
              <option value={"on-going"}>On-Going</option>
              <option value={"pending"}>Pending</option>
            </select>
            {errors.status && (
              <span className="justify-start block text-sm font-bold mb-2 text-red-500">
                {errors.status}
              </span>
            )}
          </div>
          <div className="block md:flex items-center justify-evenly">
            <div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded border-b-4 border-red-900"
                type="button"
                onClick={handleCancel}
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
  );
};

export default AddTask;
