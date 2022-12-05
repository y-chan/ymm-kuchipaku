import * as fs from 'fs'

export class Lab {
  private path: string
  readonly data: LabLine[]

  constructor(path: string) {
    this.path = path
    const temp = fs.readFileSync(path, {
      encoding: 'utf-8',
    })
    this.data = temp
      .split('\n')
      .filter((v) => !!v)
      .map((v) => new LabLine(v))
  }
}

export class LabLine {
  readonly start: number
  readonly end: number
  readonly phoneme: string

  constructor(line: string) {
    const splitLine = line.split(' ')
    if (splitLine.length !== 3) {
      throw Error('lab file is broken')
    }

    this.start = (parseInt(splitLine[0]) / 10000000)
    this.end = (parseInt(splitLine[1]) / 10000000)
    this.phoneme = splitLine[2]
  }
}
