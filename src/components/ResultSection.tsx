import { useState, type FC } from "react"
import { Check, Copy, ImageIcon, Sparkles } from "lucide-react"

interface IResultSectionProps {
	content: string
	isLoading: boolean
	imageUrl?: string | null
}

export const ResultSection: FC<IResultSectionProps> = ({ content, isLoading, imageUrl }) => {
	const [copied, setCopied] = useState<boolean>(false)

	const handleCopy = async (): Promise<void> => {
		if (!content) return
		try {
			await navigator.clipboard.writeText(content)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (error) {
			console.error("Failed to copy text: ", error)
		}
	}

	return (
		<div className="relative flex h-full min-h-100 flex-col overflow-hidden rounded-3xl border border-purple-50 bg-white p-6 shadow-xl shadow-purple-100/50 sm:p-8">
			<div className="mb-6 flex items-center justify-between">
				<h3 className="text-lg font-bold text-gray-900">Ваше поздравление</h3>
				{content && !isLoading && (
					<button
						onClick={handleCopy}
						className="p- 2 rounded-full text-gray-400 transition-colors hover:bg-purple-50 hover:text-purple-600"
						title="Копировать"
					>
						{copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
					</button>
				)}
			</div>

			<div className="flex grow flex-col">
				{isLoading ? (
					<div className="flex grow animate-pulse flex-col items-center justify-center space-y-4 text-center">
						<div className="rounded-full bg-purple-50 p-4">
							<Sparkles className="h-8 w-8 animate-spin text-purple-400" />
						</div>
						<p className="text-sm text-gray-400">ИИ придумывает магию...</p>
					</div>
				) : content || imageUrl ? (
					<div className="animate-in fade-in space-y-6 duration-500">
						{imageUrl && (
							<div className="overflow-hidden rounded-2xl border border-purple-100 shadow-md">
								<img src={imageUrl} alt="Generated Greeting Card" className="h-auto w-full object-cover" />
							</div>
						)}
						<div className="prose prose-purple max-w-none">
							<p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-700">{content}</p>
						</div>
					</div>
				) : (
					<div className="flex grow flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 p-8 text-center">
						<div className="mb-2 text-gray-300">
							<ImageIcon className="mx-auto mb-2 h-12 w-12 opacity-50" />
						</div>
						<p className="text-sm text-gray-400">
							Здесь появится ваше поздравление. Просто выберите параметры и нажмите "Сгенерировать".
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
