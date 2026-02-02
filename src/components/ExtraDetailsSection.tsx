import { LANGUAGES } from "../constants"
import type { LanguageType, ToneType } from "../types"
import { Globe, ImageIcon } from "lucide-react"
import type { FC, Dispatch, SetStateAction } from "react"

interface IExtraDetailsSectionProps {
	error: string | null
	language: string
	setLanguage: Dispatch<SetStateAction<LanguageType>>
	selectedTone: ToneType
	setTone: Dispatch<SetStateAction<ToneType>>
	isImageEnabled: boolean
	setIsImageEnabled: Dispatch<SetStateAction<boolean>>
}

export const ExtraDetailsSection: FC<IExtraDetailsSectionProps> = ({
	error,
	language,
	setLanguage,
	// selectedTone,
	// setTone,
	isImageEnabled,
	setIsImageEnabled
}) => {
	return (
		<section className="space-y-4">
			<h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
				<span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">3</span>
				Настройки
			</h3>

			<div className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-4">
				<div className="group relative">
					<label className="mb-1 ml-1 block text-sm font-medium text-gray-700">Язык</label>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<Globe className="h-4 w-4 text-gray-400 transition-colors group-focus-within:text-purple-500" />
						</div>
						<select
							value={language}
							onChange={e => setLanguage(e.target.value as LanguageType)}
							className="block w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-100 bg-white py-3 pr-8 pl-9 text-gray-900 transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none"
						>
							{LANGUAGES.map(lang => (
								<option key={lang} value={lang}>
									{lang}
								</option>
							))}
						</select>

						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
							<svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
							</svg>
						</div>
					</div>
				</div>
				<div className="flex items-center pt-2 sm:pt-6">
					<label
						className={`relative flex h-[52px] w-full cursor-pointer items-center rounded-xl border-2 p-3 transition-all duration-200 select-none ${isImageEnabled ? "border-purple-500 bg-purple-50" : "border-gray-100 bg-white hover:border-purple-200"} `}
					>
						<input
							type="checkbox"
							className="h-5 w-5 rounded border-gray-300 text-purple-600 accent-purple-600 focus:ring-purple-500"
							checked={isImageEnabled}
							onChange={e => setIsImageEnabled(e.target.checked)}
						/>
						<span className={`ml-3 text-sm font-medium ${isImageEnabled ? "text-purple-700" : "text-gray-700"}`}>
							Сгенерировать открытку
						</span>
						{isImageEnabled && <ImageIcon className="ml-auto h-4 w-4 text-purple-600" />}
					</label>
				</div>
			</div>

			{error && <p className="ml-1 animate-pulse text-sm text-red-500">{error}</p>}
		</section>
	)
}
