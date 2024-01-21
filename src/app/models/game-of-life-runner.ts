import { Array2D } from "./array-2d";
import { Point2D } from "./point-2d";
import { Utils } from "./utils";

export class GameOfLifeRunner {
    static next(array: Array2D<boolean>) {
        const originalArray = array.copy()
        for(let x = 0; x < array.width; x++) {
            for(let y = 0; y < array.height; y++) {
                array.setValueAt(
                    x, 
                    y,
                    GameOfLifeRunner.updateAt(
                        {x, y},
                        originalArray
                    )
                )
            }
        }
    }

    private static updateAt(point: Point2D, array: Array2D<boolean>) {
        const golFitler = [-1, 0, 1]
        let sum = 0
        golFitler.forEach(x => {
            golFitler.forEach(y => {
                if (x === 0 && y === 0) {
                    return
                }
                sum += array.getValueAt(
                    Utils.positiveModulo(point.x + x, array.width),
                    Utils.positiveModulo(point.y + y, array.height)
                ) ? 1 : 0
            
            })
        })

        return sum === 3 || (!!array.getValueAt(point.x, point.y) && sum === 2)
    }
}