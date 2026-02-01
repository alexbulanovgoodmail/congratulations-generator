import type { FC } from "react"
import { PartyPopper } from "lucide-react"

export const Header: FC = () => {
	return (
		<header className="sticky top-0 z-50 border-b border-purple-100 bg-white/80 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 text-gray-800 sm:px-6">
				<div className="rounded-lg bg-purple-100 p-2">
					<PartyPopper className="h-6 w-6 text-purple-600" />
				</div>
				<h1 className="text-xl font-bold">Генератор Поздравлений</h1>
			</div>
		</header>
	)
}
