# YMM-kuchipaku

## What's this?

YMM4で「あいうえお」口パクするためのアプリケーション、とりあえずはコマンドラインで動く。  
VOICEVOX/SHAREVOXなどの出力音声をカスタムボイスとして読み込んであるもので`lab`ファイルが存在するものを対象にYMM内の「表情」を利用して口パクを生成する。

## Usage

今のところはYMM4内の「動く立ち絵」のみ対応です。余力があれば「PSD立ち絵」にも対応したい...  
動く立ち絵の「口」フォルダの中に、`あ.png`、`い.png`、`う.png`、`え.png`、`お.png`、`ん.png`を用意しておきます。  
口パクさせたいキャラクターのボイスは全てカスタムボイスにしておき、とりあえず動画プロジェクトを作ります。  
また、カスタムボイスを音声合成ソフトウェアから出力する際は、`lab`ファイルを同時に吐き出すように設定しておきます。

YMM4で動画編集が終われば、YMMを一度終了し、このアプリを使って`ymmp`ファイルを読み込み、口パクを付与します。

```bash
yarn install
yarn start <file path>.ymmp
```

最後に変換された`ymmp`(`<file path>_kuchipaku.ymmp`)をYMMで開き、動画を書き出して完成です。

## TODO

- とりあえず誰でも使えるようにexeにしたい。
- エラー処理とか、ちゃんとやりたい。
- YMM内でVOICEVOXの調整までできるようになったので、そのAudioQueryを元に口パクを生成するようにしたい。

## License

本ソフトウェアは[MITライセンス](LICENSE)でライセンスされています。

## Acknowledgments

このソフトウェアは[@InuInu2022](https://github.com/InuInu2022)氏の[KuchiPaku](https://github.com/InuInu2022/KuchiPaku)を元に制作しました。
