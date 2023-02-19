import * as fs from 'fs'
import * as path from 'path'

import { Lab } from '@/src/lab'
import { isCustomVoice } from '@/src/util'
import {
  CharacterType,
  ProjectType,
  TachieFaceItemType,
  VoiceItemsType,
} from '@/types/ymmp'

export class YMMP {
  private path: string
  private projectJson: ProjectType

  constructor(path: string) {
    this.path = path
    let fileData = fs.readFileSync(path, {
      encoding: 'utf-8',
    })
    fileData = fileData[0] === '﻿' ? fileData.slice(1) : fileData
    this.projectJson = JSON.parse(fileData) as ProjectType
  }

  save(): void {
    const backupName = this.path.slice(0, -5) + '_kuchipaku.ymmp'
    fs.writeFileSync(backupName, JSON.stringify(this.projectJson, undefined, 2))
    console.log('save at:', backupName)
  }

  get fps(): number {
    return this.projectJson.Timeline.VideoInfo.FPS
  }

  get maxLayer(): number {
    return this.projectJson.Timeline.MaxLayer
  }

  incrementMaxLayer(): number {
    return ++this.projectJson.Timeline.MaxLayer
  }

  get characters(): CharacterType[] {
    return this.projectJson.Characters
  }

  get items(): (VoiceItemsType | TachieFaceItemType)[] {
    return this.projectJson.Timeline.Items
  }

  get voiceItems(): VoiceItemsType[] {
    return this.items
      .filter(
        (v) =>
          v.$type ===
          'YukkuriMovieMaker.Project.Items.VoiceItem, YukkuriMovieMaker'
      )
      .map((v) => v as VoiceItemsType)
  }

  get filterCustomVoiceItems(): VoiceItemsType[] {
    return this.voiceItems.filter((v) => isCustomVoice(v.Hatsuon))
  }

  get filterAPIVoiceItems(): VoiceItemsType[] {
    return this.voiceItems.filter(
      (v) =>
        !isCustomVoice(v.Hatsuon) &&
        !!v.VoiceParameter &&
        v.TachieFaceParameter?.$type !=
          'YukkuriMovieMaker.Plugin.Tachie.Psd.PsdTachieFaceParameter, YukkuriMovieMaker.Plugin.Tachie.Psd'
    )
  }

  get tachieTemplate(): TachieFaceItemType {
    return {
      $type:
        'YukkuriMovieMaker.Project.Items.TachieFaceItem, YukkuriMovieMaker',
      CharacterName: 'YourCharaNameHere',
      TachieFaceParameter: {
        $type:
          'YukkuriMovieMaker.Plugin.Tachie.AnimationTachie.FaceParameter, YukkuriMovieMaker.Plugin.Tachie.AnimationTachie',
        EyeAnimation: 'Default',
        MouthAnimation: 'Default',
        Eyebrow: null,
        Eye: null,
        Mouth: 'path/to/mouth/dir',
        Hair: null,
        Complexion: null,
        Body: null,
        Back1: null,
        Back2: null,
        Back3: null,
        Etc1: null,
        Etc2: null,
        Etc3: null,
      },
      TachieFaceEffects: [],
      Group: 0,
      Frame: 0,
      Layer: 0,
      Length: 0,
      PlaybackRate: 100.0,
      ContentOffset: '00:00:00',
      IsLocked: false,
      IsHidden: false,
    }
  }

  makeLipSyncItem(
    lab: Lab,
    characterName: string,
    mouseDir: string,
    insertLayer: number,
    offsetFrame: number
  ): TachieFaceItemType[] {
    const items: TachieFaceItemType[] = []

    const vowelToMouse = {
      a: 'あ.png',
      i: 'い.png',
      u: 'う.png',
      e: 'え.png',
      o: 'お.png',
      N: 'ん.png',
    }

    let lastVowel: keyof typeof vowelToMouse = 'N'
    let startFrame = offsetFrame
    let endFrame = -1

    for (const data of lab.data) {
      if (data.phoneme === 'pau' || data.phoneme === 'cl') {
        // 前の母音の形を継続する
        endFrame = offsetFrame + Math.floor(data.end * this.fps)
      } else if (
        data.phoneme === 'a' ||
        data.phoneme === 'A' ||
        data.phoneme === 'i' ||
        data.phoneme === 'I' ||
        data.phoneme === 'u' ||
        data.phoneme === 'U' ||
        data.phoneme === 'e' ||
        data.phoneme === 'E' ||
        data.phoneme === 'o' ||
        data.phoneme === 'O'
      ) {
        lastVowel = data.phoneme.toLowerCase() as keyof typeof vowelToMouse
        endFrame = offsetFrame + Math.floor(data.end * this.fps)
      } else if (
        data.phoneme == 'b' ||
        data.phoneme == 'p' ||
        data.phoneme == 'm' ||
        data.phoneme == 'by' ||
        data.phoneme == 'py' ||
        data.phoneme == 'my' ||
        data.phoneme == 'N'
      ) {
        lastVowel = 'N'
        endFrame = offsetFrame + Math.floor(data.end * this.fps)
      } else {
        console.log('else phoneme: ', data.phoneme)
      }
      console.log('now phoneme: ', data.phoneme)
      console.log('last vowel: ', lastVowel)
      console.log('start frame: ', startFrame, 'end frame: ', endFrame)

      if (endFrame !== -1) {
        const newItem = this.tachieTemplate
        newItem.Layer = insertLayer
        newItem.CharacterName = characterName
        newItem.TachieFaceParameter.Mouth = path.join(
          mouseDir,
          vowelToMouse[lastVowel]
        )
        newItem.Frame = startFrame
        if (endFrame - startFrame == 0) {
          endFrame += 1
        }
        newItem.Length = endFrame - startFrame

        items.push(newItem)
        startFrame = endFrame
        endFrame = -1
      }
    }

    return items
  }

  addTimelineItems(items: (VoiceItemsType | TachieFaceItemType)[]): void {
    this.projectJson.Timeline.Items.push(...items)
  }
}
