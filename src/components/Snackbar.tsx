import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2Icon, InfoIcon } from "lucide-react"

export function Snackbar({ variant, title, description }: { variant: "default" | "destructive"; title: string; description: string }) {
    return (
        <div className="grid w-full max-w-md items-start gap-4">
            <Alert>
                <CheckCircle2Icon />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {description}
                </AlertDescription>
            </Alert>
        </div>
    )
}
