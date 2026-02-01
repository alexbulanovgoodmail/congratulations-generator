import { Calendar, Heart, User } from "lucide-react"
import type { FC, Dispatch, SetStateAction } from "react"

interface IUserDetailsSectionProps {
	name: string
	setName: Dispatch<SetStateAction<string>>
	age: string
	setAge: Dispatch<SetStateAction<string>>
	error: string | null
	setError: Dispatch<SetStateAction<string | null>>
	interests: string
	setInterests: Dispatch<SetStateAction<string>>
}

export const UserDetailsSection: FC<IUserDetailsSectionProps> = ({
	name,
	setName,
	age,
	setAge,
	error,
	setError,
	interests,
	setInterests
}) => {
	return (
		<section className="space-y-4">
			<h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
				<span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">2</span>О
				получателе
			</h3>

			<div className="grid grid-cols-3 gap-4">
				<div className="group relative col-span-2">
					<label className="mb-1 ml-1 block text-sm font-medium text-gray-700">Имя *</label>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<User className="h-4 w-4 text-gray-400 transition-colors group-focus-within:text-purple-500" />
						</div>
						<input
							className={`block w-full rounded-xl border-2 bg-white py-3 pr-4 pl-9 text-gray-900 placeholder-gray-400 transition-all focus:ring-4 focus:ring-purple-100 focus:outline-none ${error ? "border-red-300 focus:border-red-500" : "border-gray-100 focus:border-purple-500"} `}
							type="text"
							value={name}
							placeholder="Имя"
							onChange={e => {
								setName(e.target.value)
								if (error) setError(null)
							}}
						/>
					</div>
				</div>

				<div className="group relative col-span-1">
					<label className="mb-1 ml-1 block text-sm font-medium text-gray-700">Возраст</label>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<Calendar className="h-4 w-4 text-gray-400 transition-colors group-focus-within:text-purple-500" />
						</div>
						<input
							className="block w-full rounded-xl border-2 border-gray-100 bg-white py-3 pr-4 pl-9 text-gray-900 placeholder-gray-400 transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none"
							type="text"
							value={age}
							min={1}
							max={120}
							placeholder="18"
							onChange={e => setAge(e.target.value)}
						/>
					</div>
				</div>
			</div>

			<div className="group relative">
				<label className="mb-1 ml-1 block text-sm font-medium text-gray-700">Интересы и увлечения</label>
				<div className="relative">
					<div className="pointer-events-none absolute top-3.5 left-3 flex items-start">
						<Heart className="h-4 w-4 text-gray-400 transition-colors group-focus-within:text-purple-500" />
					</div>
					<textarea
						value={interests}
						onChange={e => setInterests(e.target.value)}
						rows={2}
						className="block w-full resize-none rounded-xl border-2 border-gray-100 bg-white py-3 pr-4 pl-9 text-gray-900 placeholder-gray-400 transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-100 focus:outline-none"
						placeholder="Путешествия, коты, программирование..."
					/>
				</div>
			</div>
		</section>
	)
}
