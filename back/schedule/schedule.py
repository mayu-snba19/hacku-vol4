from apscheduler.schedulers.blocking import BlockingScheduler

from src.api.service.bot import BotService


# 当日締め切りの貸し借りの確認バッチ処理
def schedule():
    print('start schedule job...')
    scheduler = BlockingScheduler()
    bot_service = BotService()
    scheduler.add_job(bot_service.send_message_for_deadline_lendings, trigger='cron', hour="20")
    scheduler.start()


if __name__ == "__main__":
    schedule()
