export class Utils {
  public static randomColor = (): number => parseInt(Math.floor(Math.random() * 16777215).toString(16), 16)

  public static generateRandomInteger = (min: number, max: number): number =>
    Math.floor(min + Math.random() * (max - min + 1))
}
