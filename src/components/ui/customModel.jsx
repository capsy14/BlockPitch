import React from "react"
import Modal from "react-modal"
import { X } from "lucide-react"

Modal.setAppElement("#root") // For Create React App; use "#__next" for Next.js

function CustomModal({ isOpen, onClose, title, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-xl shadow-lg max-w-md mx-auto my-24 p-6 relative outline-none"
      overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-gray-600 hover:text-black transition"
      >
        <X size={20} />
      </button>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </Modal>
  )
}

export default CustomModal
