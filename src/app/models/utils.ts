export class Utils {
    static positiveModulo = (n: number, m: number) => (
        ((n % m) + m) % m
    )
}