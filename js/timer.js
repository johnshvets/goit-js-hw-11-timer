class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.daysBox = this.selector.querySelector('[data-value="days"]');
    this.hoursBox = this.selector.querySelector('[data-value="hours"]');
    this.minsBox = this.selector.querySelector('[data-value="mins"]');
    this.secsBox = this.selector.querySelector('[data-value="secs"]');
    this.targetDate = targetDate;
    this.timerId = null;
  }

  startTimer() {
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const timeComponents = this.getTime(deltaTime);

      if (currentTime === this.targetDate) {
        clearInterval(this.timerId);
      }
      this.updateTimer(timeComponents);
    }, 1000);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  getTime(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  updateTimer({ days, hours, mins, secs }) {
    this.daysBox.textContent = days;
    this.hoursBox.textContent = hours;
    this.minsBox.textContent = mins;
    this.secsBox.textContent = secs;
  }
}

const newYearCountdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2021'),
});

newYearCountdownTimer.startTimer();
