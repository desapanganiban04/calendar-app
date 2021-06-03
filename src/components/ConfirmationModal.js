const ConfirmationModal = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-teal-lightest font-sans absolute z-50">
      <div className="h-screen w-full absolute flex items-center justify-center bg-modal">
        <div className="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center overflow">
          <div className="mb-4">
            <h1>Welcome!</h1>
          </div>
          <div className="mb-8">
            <p>
              Ready to get started? Keep scrolling to see some great components.
            </p>
          </div>
          <div className="flex justify-center">
            <button className="flex-no-shrink text-black py-2 px-4 rounded bg-teal hover:bg-teal-dark">
              Let's Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
