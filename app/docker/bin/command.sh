#!/usr/bin/env bash

# .env ファイルが無ければ .env.example からコピーする
if [ ! -e "/usr/src/app/.env" ]; then
    cp /usr/src/app/.env.example /usr/src/app/.env
fi

# モジュールのインストール
npm install

# ローカルサーバーの起動
npm start
