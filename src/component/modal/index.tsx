import { useState, useRef, useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	children?: React.ReactNode;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	children,
	onClose,
}: ModalProps) => {
	// const [isModalOpen, setIsModalOpen] = useState(isOpen);
	const modalRef = useRef<HTMLDivElement>(null);

	const closeModal = () => {
		onClose();
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			closeModal();
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="absolute inset-0 bg-black opacity-50"></div>
					<div ref={modalRef} className="relative p-4 bg-white">
						<button
							className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
							onClick={closeModal}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M5.293 5.293a1 1 0 0 1 1.414 0L10 8.586l3.293-3.293a1 1 0 1 1 1.414 1.414L11.414 10l3.293 3.293a1 1 0 1 1-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L8.586 10 5.293 6.707a1 1 0 0 1 0-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						{/* <h2 className="mb-2 text-lg font-bold">{title}</h2> */}
						{/* <p className="mb-4">Modal content goes here.</p> */}
						{children}
						{/* <div className="flex gap-4">
							<button
								className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
								onClick={closeModal}
							>
								Close
							</button>
							<button
								className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
								onClick={onSubmit}
							>
								submit
							</button>
						</div> */}
					</div>
				</div>
			)}
		</>
	);
};

export default Modal;
