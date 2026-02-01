export enum OccasionType {
	DAY_BIRTHDAY = "День Рождения",
	NEW_YEAR = "Новый Год"
}

// export const OccasionType = {
// 	DAY_BIRTHDAY: "День Рождения",
// 	NEW_YEAR: "Новый Год"
// } as const
// export type OccasionType = (typeof OccasionType)[keyof typeof OccasionType]

export enum ToneType {
	OFFICIAL = "Официальный",
	FRIENDLY = "Дружеский",
	HUMOROUS = "Юмористический",
	ROMANTIC = "Романтический",
	TOUCHING = "Трогательный",
	ADULT = "18+"
}

export type LanguageType = "Русский" | "Белорусский" | "English" | "Deutsch" | "Español" | "Français"
