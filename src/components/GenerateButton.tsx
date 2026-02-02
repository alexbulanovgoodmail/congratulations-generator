import type { FC, ReactNode } from "react"

interface IGenerateButtonProps {
	children?: ReactNode
	isLoading: boolean
	onClick?: () => Promise<void>
}

export const GenerateButton: FC<IGenerateButtonProps> = ({ children, isLoading, onClick }) => {
	return (
		<button
			onClick={onClick}
			disabled={isLoading}
			className={`group flex w-full transform items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 ${
				isLoading
					? "cursor-not-allowed bg-purple-400"
					: "bg-linear-to-r from-purple-600 to-purple-700 hover:scale-[1.02] hover:from-purple-500 hover:to-purple-600 active:scale-[0.98]"
			} `}
		>
			{children}
		</button>
	)
}
