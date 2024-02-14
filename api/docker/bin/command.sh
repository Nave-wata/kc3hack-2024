#!/usr/bin/env bash

# パッケージのインストール
poetry install --no-root

# サーバの起動
poetry run uvicorn main:app --reload --host 0.0.0.0
