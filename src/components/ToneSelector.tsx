import type { FC, Dispatch, SetStateAction } from "react"
import { ToneType } from "../types"

interface IToneSelectorProps {
	selectedTone: ToneType
	setTone: Dispatch<SetStateAction<ToneType>>
}

export const ToneSelector: FC<IToneSelectorProps> = ({ selectedTone, setTone }) => {
	const tones = Object.values(ToneType)

	return (
		<div className="flex flex-wrap gap-3">
			{tones.map(tone => (
				<button
					key={tone}
					onClick={() => setTone(tone)}
					className={`rounded-xl border-2 px-5 py-3 text-sm font-medium transition-all duration-200 ${
						selectedTone === tone
							? "border-purple-500 bg-purple-50 text-purple-700 shadow-md"
							: "border-gray-100 bg-white text-gray-500 hover:border-purple-200 hover:bg-purple-50/50"
					} `}
				>
					{tone}
				</button>
			))}
		</div>
	)
}
