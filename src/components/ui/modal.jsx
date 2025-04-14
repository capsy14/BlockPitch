// components/ui/Modal.js
export const Modal = ({ isOpen, close, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold mb-4">{title}</h3>
          <div>{children}</div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={close}
              className="px-4 py-2 bg-gray-200 rounded-md mr-2 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={close}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  