import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TaskContext } from "../contexts/TaskContext";

const ConfirmationModal = ({ handleCloseModal = () => {} }) => {
  const history = useHistory();
  const { removeTask } = useContext(TaskContext);
  const { id } = useParams();

  const handleOnConfirmation = ({ target: { name } }) => {
    if (name === "deleteBtn") {
      removeTask(id, () => {
        history.push("/");
      });
    } else {
      handleCloseModal();
    }
  };

  return (
    <div className="h-screen w-screen backdrop-filter backdrop-grayscale backdrop-blur-sm backdrop-contrast-150 flex flex-col items-center justify-center bg-teal-lightest absolute z-50 -top-0">
      <div className="absolute flex items-center justify-center bg-modal">
        <div className="bg-white rounded shadow-2xl p-8 m-4 max-w-xs max-h-full text-center border-gray-200">
          <div className="m-4  items-end">
            <svg
              class="w-full h-20 stroke-current text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
          </div>
          <div className="mb-4">
            <h1 className="font-bold">Are you sure?</h1>
          </div>
          <div className="mb-8">
            <p>
              Are you sure you want to delete this task? This process cannnot be
              undone.
            </p>
          </div>
          <div className="flex justify-between">
            <button
              name="cancelBtn"
              className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-400 rounded"
              onClick={handleOnConfirmation}
            >
              Cancel
            </button>
            <button
              name="deleteBtn"
              className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-400 rounded"
              onClick={handleOnConfirmation}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
