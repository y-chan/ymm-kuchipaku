import * as fs from 'fs'

const isFilePattern = /^[A-Z].+\.[0-9a-zA-Z]{3,}$/

export const isCustomVoice = (hatsuon: string): boolean => {
  return isFilePattern.test(hatsuon) && fs.existsSync(hatsuon)
}
