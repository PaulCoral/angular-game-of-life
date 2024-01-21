
export class Array2D<T> {
    private array: T[]

    constructor(
        readonly width: number,
        readonly height: number,
        private readonly defaultValue: () => T,
        array?: T[]
    ) {
        if(array) {
            if(array.length != width * height) {
                throw 'error : array size'
            }
            this.array = [...array]
        } else {
            this.array = []
            for(let y = 0; y < this.height; y++) {
                for(let x = 0; x < this.width; x++) {
                    this.array.push(defaultValue())
                }
            }
        }
    }

    getValueAt(x: number, y: number): T | undefined {
        const index = x + y * this.width
        if(index >= this.array.length) {
            return undefined
        }

        return this.array[index]
    }

    setValueAt(x: number, y: number, value: T): void {
        const index = x + y * this.width
        if(index >= this.array.length) {
            return
        }

        this.array[index] = value
    }

    toRows(): T[][] | undefined {
        const arr = [] as T[][]
        for(let y = 0; y < this.height; y++) {
            const row = [] as T[]
            arr.push(row)
            for(let x = 0; x < this.width; x++) {
                const value = this.getValueAt(x, y)
                if(value === undefined) {
                    throw '2d array return something wrong'
                }
                row.push(value)      
            }
        }
        return arr
    }

    copy() {
        return new Array2D(
            this.width,
            this.height,
            this.defaultValue,
            [...this.array]
        )
    }
}