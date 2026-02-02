import { LANGUAGES } from "./constants"
import { OccasionType, ToneType, type LanguageType } from "./types"
import { useState } from "react"
import { Cake, Snowflake, Sparkles } from "lucide-react"
import { generateCongratulation, generateGreetingImage } from "./services/geminiService"
import { Header } from "./components/Header"
import { AppTitle } from "./components/AppTitle"
import { OccasionButton } from "./components/OccasionButton"
import { UserDetailsSection } from "./components/UserDetailsSection"
import { ExtraDetailsSection } from "./components/ExtraDetailsSection"
import { GenerateButton } from "./components/GenerateButton"
import { ResultSection } from "./components/ResultSection"

function App() {
	const [occasion, setOccasion] = useState<OccasionType>(OccasionType.DAY_BIRTHDAY)
	const [name, setName] = useState<string>("")
	const [age, setAge] = useState<string>("")
	const [interests, setInterests] = useState<string>("")
	const [tone, setTone] = useState<ToneType>(ToneType.FRIENDLY)
	const [language, setLanguage] = useState<LanguageType>(LANGUAGES[0])
	const [congratulation, setCongratulation] = useState<string>("")
	const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)
	const [isImageEnabled, setIsImageEnabled] = useState<boolean>(false)

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
		setGeneratedImageUrl(null)

		try {
			const tasks: Promise<any>[] = [generateCongratulation(occasion, name, tone, language, age, interests)]

			if (isImageEnabled) {
				tasks.push(generateGreetingImage(occasion, tone, interests))
			}

			const results = await Promise.all(tasks)
			const textResult = results[0] as string
			setCongratulation(textResult)

			if (isImageEnabled && results[1]) {
				const imageUrl = results[1] as string
				setGeneratedImageUrl(imageUrl)
			}
		} catch (error: any) {
			setError(error.message || "Ошибка при генерации поздравления.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-[#faf5ff]">
			<Header />

			<main className="sm container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<AppTitle />

					<div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
						<div className="space-y-8 sm:space-y-10 lg:col-span-5">
							<section className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
										<span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
											1
										</span>
										Выберите праздник
									</h3>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<OccasionButton
										label={OccasionType.DAY_BIRTHDAY}
										icon={Cake}
										selected={occasion === OccasionType.DAY_BIRTHDAY}
										onClick={() => setOccasion(OccasionType.DAY_BIRTHDAY)}
									/>
									<OccasionButton
										label={OccasionType.NEW_YEAR}
										icon={Snowflake}
										selected={occasion === OccasionType.NEW_YEAR}
										onClick={() => setOccasion(OccasionType.NEW_YEAR)}
									/>
								</div>
							</section>

							<UserDetailsSection
								name={name}
								setName={setName}
								age={age}
								setAge={setAge}
								error={error}
								setError={setError}
								interests={interests}
								setInterests={setInterests}
							/>

							<ExtraDetailsSection
								error={error}
								language={language}
								selectedTone={tone}
								isImageEnabled={isImageEnabled}
								setTone={setTone}
								setLanguage={setLanguage}
								setIsImageEnabled={setIsImageEnabled}
							/>

							<GenerateButton isLoading={loading} onClick={handleGenerate}>
								<Sparkles className={`h-5 w-5 ${loading ? "animate-spin" : "group-hover:animate-pulse"}`} />
								{loading ? "Сочиняем..." : "Сгенерировать"}
							</GenerateButton>
						</div>

						<div className="h-full lg:col-span-7">
							<ResultSection content={congratulation} isLoading={loading} imageUrl={generatedImageUrl} />
						</div>
					</div>
				</div>
			</main>
		</div>
	)
}

export default App
