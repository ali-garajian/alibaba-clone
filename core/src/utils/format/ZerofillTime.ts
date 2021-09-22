export function ZeroFillTime(value: number) {
    return value < 10 ? `0${value}:00` : `${value}:00`
}
