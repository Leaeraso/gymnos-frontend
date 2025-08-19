import { AffiliateSex } from "@/types/affiliates.type"
import { Mars, Transgender, Venus } from "lucide-react"

export function GenderIcon({ gender }: { gender: string }) {
    return (
        <>
            {gender === AffiliateSex.Man && <Mars className="w-5 h-5" />}
            {gender === AffiliateSex.Woman && <Venus className="w-5 h-5" />}
            {gender === AffiliateSex.Other && <Transgender className="w-5 h-5" />}
        </>
    )
}