# hacku-vol4 backend

## ディレクトリ構成
開発者がいじるソースコードのディレクトリの構成のみ示しています。

```
.
├── src
│├── api             APIを実装するファイル群。リソースごとにファイルを作成する。
│└── model           モデルを定義するファイル群。
│├── migrations      マイグレーションに関するファイル群。直接いじることはない。
│
│├── __init__.py     起動時に実行される
│├── config.py       DB接続の設定。いじらないで。
│├── migrate.sh      マイグレーションを行うスクリプトファイル
```

開発者が変更を加えるのは主にapiとmodel配下のファイルです。

## ローカル環境のセットアップ

### 前提
- docker-composeが使用できる
   
### 手順
1. backディレクトリに移動する
    
    `$ cd back`
  
 
2. Dockerイメージをビルドする
   
   `$ docker-compose build`
   

3. Dockerコンテナを起動する
   
   `$ docker-compose up`


4. コンテナ内に入る

   `$ docker-compose exec flask bash`


5. /var/app/srcディレクトリに移動する

   `$ cd src`


5. 現在のマイグレーションをDBに反映する
   
   `$ flask db upgrade`


6. マイグレーションの更新(モデルを更新した際)

   コンテナ内の`/var/app/src`ディレクトリでシェルスクリプトを実行
 
   `$ ./migrate.sh`

### 補足
何かエラーが起こってうまくいかない際は、`docker-compose up`でコンテナを再起動してみてください。それでも直らない際は教えてください。



## デプロイ環境のマイグレーション
デプロイ環境の管理者以外は見なくても大丈夫です。

### 手順
1. RDSへのアクセス権限を持つEC2インスタンス等にログインし、backディレクトリに移動。


2. `$ docker run -d --rm --name hacku-vol4 --env-file=.env --net host hacku-vol4`


3. `$ docker exec -it hacku-vol4 bash`


後はローカル環境と同様にDBの初期化やマイグレーションを行う。



## デプロイ 
Docker, AWS, CircleCIを使ってパイプラインを構築しています。

mainブランチに変更がpushされると、自動的に最新の変更がCircleCIを通してAWSのECSに反映されます。


## エンドポイント
`https://sotesote.tk`でホストしています。


## 参考
- [Flask-Migrate](https://flask-migrate.readthedocs.io/en/latest/#command-reference)
- [Docker Compose入門 (3) ～ネットワークの理解を深める～](https://knowledge.sakura.ad.jp/23899/)