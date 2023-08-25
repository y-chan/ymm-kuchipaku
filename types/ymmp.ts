export type MoraType = {
  text: string
  consonant: string | null
  consonant_length: number | null
  vowel: string
  vowel_length: number
  pitch: number
}

export type AccentPhraseType = {
  moras: MoraType[]
  accent: number
  pause_mora: MoraType | null
}

export type AudioQueryType = {
  accent_phrases: AccentPhraseType[]
  speedScale: number
  pitchScale: number
  intonationScale: number
  volumeScale: number
  prePhonemeLength: number
  postPhonemeLength: number
  outputSamplingRate: number
  outputStereo: boolean
  kana: string
}

export type VoiceVoxPronounceType = {
  $type: string
  AudioQuery: AudioQueryType
}

export type VideoInfoType = {
  FPS: number
  Hz: number
  Width: number
  Height: number
}

export type VolumePanType = {
  From: number
  To: number
  AnimationType: string
  Span: number
}

export type VoiceVoxVoiceParameterType = {
  $type: string
  StyleID: number
  Speed: number
  Pitch: number
  Intonation: number
  PrePhonemeLength: number
  PostPhonemeLength: number
}

export type TachieFaceParameterAnimationTachieType = {
  $type: string
  Mouth: string
  [key: string]: any
}

export type TachieFaceParameterPSDType = {
  $type: string
  FilePath: string
  EnableLayers: string[]
  [key: string]: any
}

export type TachieFaceParameterType =
  | TachieFaceParameterAnimationTachieType
  | TachieFaceParameterPSDType

export type VoiceItemsType = {
  $type: string
  IsWaveformEnabled: boolean
  CharacterName: string
  Serif: string
  Decorations: any[]
  Hatsuon: string
  Pronounce: VoiceVoxPronounceType | null
  VoiceLength: string
  VoiceCache: null
  Volume: VolumePanType
  Pan: VolumePanType
  PlaybackRate: number
  VoiceParameter: VoiceVoxVoiceParameterType | null
  TachieFaceParameter: TachieFaceParameterType | null
  Frame: number
  [key: string]: any // TODO
}

export type TachieFaceItemType = {
  $type: string
  CharacterName: string
  TachieFaceParameter: TachieFaceParameterType
  Frame: number
  Length: number
  Layer: number
  [key: string]: any
}

export type TimelineType = {
  VideoInfo: VideoInfoType
  Items: (VoiceItemsType | TachieFaceItemType)[]
  LayerSettings: {
    Items: any[]
  }
  CurrentFrame: number
  Length: number
  MaxLayer: number
  [key: string]: any // TODO
}

export type TachieCharacterParameterType = {
  $type: string
  Directory: string
  [key: string]: any // TODO
}

export type CharacterType = {
  Name: string
  GroupName: string
  Color: string
  Voice: {
    API: string
    Ard: string
  }
  Volume: VolumePanType
  Pan: VolumePanType
  PlaybackRate: number
  VoiceParameter: VoiceVoxVoiceParameterType | null
  CustomVoiceDirectory: string | null
  CustomVoiceFileName: string
  TachieType: string
  TachieCharacterParameter: TachieCharacterParameterType
}

export type ProjectType = {
  FilePath: string
  Timeline: TimelineType
  Characters: CharacterType[]
  CollapsedGroups: any[]
}
