import * as path from 'path'
import yargs from 'yargs'

import { Lab } from '@/src/lab'
import { YMMP } from '@/src/ymmp'

const args = yargs
  .command(
    '* <ymmp>',
    'Create Kuchipaku for Yukkuri Movie Maker 4 Project from Label file'
  )
  .positional('ymmp', {
    describe: 'Yukkuri Movie Maker Project File',
    type: 'string',
    demandOption: true,
  })
  .parseSync()

console.log('project:', args.ymmp)
const ymmp = new YMMP(args.ymmp)
const characterMouseDir: Record<string, string> = {}
ymmp.characters.forEach((character) => {
  characterMouseDir[character.Name] = path.join(
    character.TachieCharacterParameter.Directory,
    '口'
  )
})
const maxLayer = ymmp.incrementMaxLayer()
ymmp.filterCustomVoiceItems.map((item) => {
  const lab = new Lab(item.Hatsuon.replace(/\.[^/.]+$/, '.lab'))
  const items = ymmp.makeLipSyncItem(
    lab,
    item.CharacterName,
    characterMouseDir[item.CharacterName],
    maxLayer,
    item.Frame
  )
  ymmp.addTimelineItems(items)
})

ymmp.save()
