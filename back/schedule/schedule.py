from src.api.service.bot import BotService


# 当日締め切りの貸し借りの確認バッチ処理
def schedule():
    print('start scheduled job...')
    bot_service = BotService()
    bot_service.send_message_for_deadline_lendings()


if __name__ == "__main__":
    schedule()
