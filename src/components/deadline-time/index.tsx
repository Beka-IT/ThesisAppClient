import { Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useCookie } from "src/hooks"
import { useGetDeadlineQuery } from "src/store"
import { getBelowDateTime } from "src/utils"

type DeadLineTime = {
    days: number;
    minutes: number;
    hours: number;
    seconds: number;
}

export const DeadlineTime = () => {
    const { data } = useGetDeadlineQuery({})
    const { t } = useTranslation()
    const reDate = new Date()
    const profile = useCookie<Profile>("profile").getCookie()
    const deadline = profile?.deadline
    const [state, setState] = useState<DeadLineTime>(getBelowDateTime(deadline || reDate))

    useEffect(() => {
        setInterval(() => {
            const res = getBelowDateTime(deadline || reDate)
            setState(res)
        }, 60000)
    }, [data])
    return (
        <div>
            <Title fz={{ base: 24, md: 32 }} className="dark:text-white">
                <span style={{ color: "grey", width: "120px", margin: "0 10px" }}>
                    {Math.abs(state.days)}-{t("days")}
                </span>
                <span style={{ width: '100px' }}>{Math.abs(state.hours)}:</span>
                <span style={{ width: '100px' }}>{Math.abs(state.minutes)}</span>
            </Title>
        </div>
    )
}
