import { LANGUAGES } from "./constants"
import { OccasionType, ToneType, type LanguageType } from "./types"
import { useState } from "react"
import { generateCongratulation } from "./services/geminiService"

function App() {
	const [occasion, setOccasion] = useState<OccasionType>(OccasionType.DAY_BIRTHDAY)
	const [name, setName] = useState<string>("")
	const [age, setAge] = useState<string>("")
	const [interests, setInterests] = useState<string>("")
	const [tone, setTone] = useState<ToneType>(ToneType.FRIENDLY)
	const [language, setLanguage] = useState<LanguageType>(LANGUAGES[0])
	const [congratulation, setCongratulation] = useState<string>("")

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handleGenerate = async (): Promise<void> => {
		if (!name.trim()) {
			setError("Пожалуйста, введите имя.")
			return
		}

		setError(null)
		setLoading(true)
		setCongratulation("")

		try {
			const result = await generateCongratulation(occasion, name, tone, language, age, interests)
			setCongratulation(result)
		} catch (error: any) {
			setError(error.message || "Ошибка при генерации поздравления.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-[#faf5ff]">
			<header>Генератор поздравлений</header>

			<h3>{occasion}</h3>
			<h3>{name}</h3>
			<h3>{age}</h3>
			<h3>{interests}</h3>
			<h3>{tone}</h3>
			<h3>{language}</h3>
			<h3>{error}</h3>

			<h2>Сгенерированное поздравление:</h2>
			<p>{congratulation}</p>

			<main className="sm container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<button onClick={() => setOccasion(OccasionType.DAY_BIRTHDAY)}>День Рождения</button>
					<button onClick={() => setOccasion(OccasionType.NEW_YEAR)}>Новый Год</button>

					<br />
					<input type="text" value={name} placeholder="Имя" onChange={e => setName(e.target.value)} />

					<br />
					<input type="text" value={age} placeholder="Возраст" onChange={e => setAge(e.target.value)} />

					<br />
					<textarea
						value={interests}
						rows={2}
						placeholder="Путешествия, кодинг, котики..."
						onChange={e => setInterests(e.target.value)}
					></textarea>

					<br />
					{Object.values(ToneType).map(tone => (
						<button key={tone} onClick={() => setTone(tone)}>
							{tone}
						</button>
					))}

					<br />
					<select
						name="language"
						id="language"
						value={language}
						onChange={e => setLanguage(e.target.value as LanguageType)}
					>
						{LANGUAGES.map(language => (
							<option key={language} value={language}>
								{language}
							</option>
						))}
					</select>

					<br />
					<button disabled={loading} onClick={handleGenerate}>
						Сгенерировать
					</button>
				</div>
			</main>
		</div>
	)
}

export default App
