import { OccasionType, ToneType, type LanguageType } from "../types"
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
	apiKey: import.meta.env.VITE_GEMINI_API_KEY
})

export const generateCongratulation = async (
	occasion: OccasionType,
	name: string,
	tone: ToneType,
	language: LanguageType,
	age?: string,
	interests?: string
): Promise<string> => {
	try {
		const prompt = `
    Напиши уникальное поздравление на ${language} языке.
    По случаю: ${occasion}.
    Для человека по имени: ${name}.
    Возраст: ${age ? age : "не указан"}.
    Интересы/хобби: ${interests ? interests : "не указаны"}.
    В тоне: ${tone}.
    Сделай поздравление личным и душевным.
    Избегай клише и шаблонных фраз.
    Начни поздравление с обращения
    Заверши поздравление тёплыми пожеланиями.

    Инструкции по тону (адаптируй под культурный контекст языка ${language}):
    - Официальный: используй вежливый и уважительный язык, избегай сленга.
    - Дружеский: будь непринуждённым и тёплым, как будто пишешь близкому другу.
    - Юмористический: добавь лёгкий юмор и шутки, чтобы вызвать улыбку.
    - Романтический: используй нежный и ласковый язык, выражай тёплые чувства.
    - Трогательный: сосредоточься на искренности и глубине эмоций.
    - 18+: включи игривые и пикантные элементы, сохраняя при этом хороший вкус.

    Общие требования:
    - Обязательно учитывай возраст получателя, если он указан и интересы.
    Длина поздравления должна быть от 2 до 5 предложений.
    - Используй 2-3 эмодзи, соответствующие тону поздравления.
    - Форматирование: просто текст, без специальных тегов или разметки.
    - Язык ответа СТРОГО: ${language}.
    `

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash",
			contents: prompt,
			config: {
				temperature: tone === ToneType.ADULT ? 0.9 : 0.7
			}
		})

		if (response.text) {
			return response.text
		}
		throw new Error("No response text from Gemini API.")
	} catch (error) {
		console.error("Error generating congratulation:", error)
		throw new Error("Ошибка при генерации поздравления.")
	}
}

export const generateGreetingImage = async (
	occasion: OccasionType,
	tone: ToneType,
	interests?: string
): Promise<string | null> => {
	try {
		const prompt = `
      Высококачественная цифровая иллюстрация для поздравительной открытки.
      Повод: ${occasion}.
      Настроение/Тон: ${tone}.
      ${interests ? `Темы/Интересы: ${interests}` : ""}.
      Стиль: Яркий, художественный, высокое разрешение, эстетически привлекательный.
      Без текста на изображении.
    `

		const response = await ai.models.generateContent({
			model: "gemini-2.5-flash-image", // Платная модель возможно потребуется сменить на доступную
			contents: prompt,
			config: {
				imageConfig: {
					aspectRatio: "4:3"
				}
			}
		})

		for (const part of response.candidates?.[0]?.content?.parts || []) {
			if (part.inlineData) {
				const base64EncodeString = part.inlineData.data
				return `data:image/png;base64,${base64EncodeString}`
			}
		}

		return null
	} catch {
		console.error("Ошибка при генерации изображения.")
		return null
	}
}
