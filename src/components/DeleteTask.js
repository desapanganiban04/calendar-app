import { useDeleteTask } from "../hooks";

const DeleteTask = ({ handleCloseModal, callBack, selected }) => {
  const [deleteData] = useDeleteTask();

  const handleOnConfirm = ({ target: { name } }) => {
    if (name === "deleteBtn") {
      deleteData(selected, () => {
        callBack();
        handleCloseModal();
      });
    } else {
      handleCloseModal();
    }
  };

  return (
    <div className="h-full w-full bg-black bg-opacity-50 flex flex-col items-center justify-center absolute z-50 inset-0">
      <div className="absolute flex items-center justify-center bg-modal">
        <div className="bg-white rounded p-8 m-4 max-w-xs max-h-full text-center">
          <div className="m-4  items-end">
            <svg
              className="w-full h-20 stroke-current text-red-400"
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
              className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
              onClick={handleOnConfirm}
            >
              Cancel
            </button>
            <button
              name="deleteBtn"
              className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
              onClick={handleOnConfirm}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
