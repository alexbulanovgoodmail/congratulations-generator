import type { OccasionType } from "../types"
import type { LucideIcon } from "lucide-react"
import type { FC } from "react"

interface IOccasionButtonProps {
	label: OccasionType
	icon: LucideIcon
	selected: boolean
	onClick: () => void
}

export const OccasionButton: FC<IOccasionButtonProps> = ({ label, icon: Icon, selected, onClick }) => {
	return (
		<button
			className={`relative flex h-32 w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 transition-all duration-200 ${
				selected
					? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm"
					: "border-gray-200 bg-gray-50 text-gray-500 hover:border-purple-200 hover:bg-purple-50/50"
			} `}
			onClick={() => onClick()}
		>
			<div className={`rounded-full p-3 ${selected ? "bg-purple-200" : "bg-white"}`}>
				<Icon className={`h-6 w-6 ${selected ? "text-purple-700" : "text-gray-400"}`} />
			</div>
			<span className="text-sm font-semibold sm:text-base">{label}</span>

			{selected && <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-purple-500" />}
		</button>
	)
}
