#!/usr/bin/env bash

# .env ファイルが無ければ .env.example からコピーする
if [ ! -e "/usr/src/app/.env" ]; then
    cp /usr/src/app/.env.example /usr/src/app/.env
fi

# パッケージのインストール
poetry install --no-root

# DB が起動するまで待機
while true; do
    curl db:3306

    if [ $? -eq 1 ]; then
        break
    fi

    sleep 1
done

# マイグレーション
poetry run python -m database.migrate

# 初期データの投入
poetry run python -m database.seed

# サーバの起動
poetry run uvicorn main:app --reload --host 0.0.0.0
