import type { FC } from "react"

export const AppTitle: FC = () => {
	return (
		<div className="mb-10 sm:mb-16">
			<h2 className="mb-4 text-4xl leading-tight font-extrabold text-gray-900 sm:text-5xl">
				Создайте <span className="text-purple-600">уникальное</span>
				<br className="hidden sm:block" /> поздравление
			</h2>
			<p className="max-w-2xl text-lg text-gray-500">
				Выберите праздник, введите имя и магия начнется! Наш ИИ создаст персональное пожелание за секунды.
			</p>
		</div>
	)
}
