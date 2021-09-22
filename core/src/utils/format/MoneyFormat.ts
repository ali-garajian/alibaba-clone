export function MoneyFormat(value?: number) {
    const money =
        value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٫')
    return money
}
