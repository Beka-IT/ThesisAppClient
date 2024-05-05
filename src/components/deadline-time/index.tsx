import { Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useGetDeadlineQuery } from "src/store"
import { getBelowDateTime } from "src/utils"


export const DeadlineTime = () => {
    const [state, setState] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" })
    const { data } = useGetDeadlineQuery({})
    const { t } = useTranslation()

    useEffect(() => {
        setInterval(() => {
            const res = getBelowDateTime(data?.endDate || new Date(), t)
            setState(res)
        }, 1000)
    }, [data])
    return (
        <div>
            <Title fz={{ base: 24, md: 32 }} className="dark:text-white">
                <span style={{ color: "grey" }}>{state.days}-{t("days")} </span>
                <span>{state.hours}:</span>
                <span>{state.minutes}:</span>
                <span>{state.seconds.length < 2 ? `0${state.seconds}` : state.seconds}</span>
            </Title>
        </div>
    )
}
