import schedule
import time
import subprocess

def job():
    subprocess.call(["python","/Users/lyz/python/Crawler/Crawler.py"])

# schedule.every(30).seconds.do(job)
# schedule.every(10).minutes.do(job)
schedule.every(6).hour.do(job)
# schedule.every().day.at("10:30").do(job)
# schedule.every().monday.do(job)
# schedule.every().wednesday.at("13:15").do(job)

while True:
    schedule.run_pending()
    time.sleep(1)