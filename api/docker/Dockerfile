FROM python:3.11-slim

WORKDIR /usr/src/app

RUN \
    # パッケージインストール
    apt-get update -y -qq ; apt-get install -y -qq --no-install-recommends \
      sudo \
    ; \
    \
    # キャッシュ削除
    apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/* \
    ; \
    \
    # 開発ユーザーの作成
    useradd -m -s /bin/bash dev ; \
    usermod -aG sudo dev \
    ; \
    \
    # 開発ユーザに sudo 権限を付与
    echo "" >> /etc/sudoers ; \
    echo "# Don't require password for sudo command for dev user" >> /etc/sudoers ; \
    echo "dev ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers \
    ; \
    \
    # poetry インストール
    pip install poetry

# 起動時に実行するコマンドをコピー
COPY ./docker/bin/command.sh /usr/local/bin/command.sh

# 起動時に実行するコマンドを実行可能にする
RUN chmod +x /usr/local/bin/command.sh

# 開発ユーザに切り替え
USER dev

CMD ["/usr/local/bin/command.sh"]
