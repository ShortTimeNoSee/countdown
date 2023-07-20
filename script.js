document.addEventListener('DOMContentLoaded', () => {
  const countdown = document.querySelector('.countdown');
  const settingsBtn = document.getElementById('settings-btn');
  const settings = document.getElementById('settings');
  const eventNameInput = document.getElementById('eventName');
  const eventDateInput = document.getElementById('eventDate');
  const eventTimeInput = document.getElementById('eventTime');
  const timeZoneInput = document.getElementById('timeZone');
  const showWeeksCheckbox = document.getElementById('showWeeks');
  const showDaysCheckbox = document.getElementById('showDays');
  const showHoursCheckbox = document.getElementById('showHours');
  const showMinutesCheckbox = document.getElementById('showMinutes');
  const showSecondsCheckbox = document.getElementById('showSeconds');
  const showMillisecondsCheckbox = document.getElementById('showMilliseconds');

  let eventDate = new Date('2023-08-22T08:30:00');
  let timeZoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  let showWeeks = false;
  let showDays = true;
  let showHours = true;
  let showMinutes = true;
  let showSeconds = true;
  let showMilliseconds = false;

  function updateCountdown() {
    const now = new Date();
    let timeDifference = eventDate - now - timeZoneOffset;

    if (timeDifference <= 0) {
      countdown.textContent = 'The event has already passed!';
      return;
    }

    const weeks = Math.floor(timeDifference / (7 * 24 * 60 * 60 * 1000));
    timeDifference %= 7 * 24 * 60 * 60 * 1000;
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    timeDifference %= 24 * 60 * 60 * 1000;
    const hours = Math.floor(timeDifference / (60 * 60 * 1000));
    timeDifference %= 60 * 60 * 1000;
    const minutes = Math.floor(timeDifference / (60 * 1000));
    timeDifference %= 60 * 1000;
    const seconds = Math.floor(timeDifference / 1000);
    const milliseconds = timeDifference % 1000;

    let countdownText = '';
    if (showWeeks) countdownText += `${weeks}w `;
    if (showDays) countdownText += `${days}d `;
    if (showHours) countdownText += `${hours}h `;
    if (showMinutes) countdownText += `${minutes}m `;
    if (showSeconds) countdownText += `${seconds}s `;
    if (showMilliseconds) countdownText += `${milliseconds}ms`;

    countdown.textContent = countdownText.trim();
  }
  
  function initializeSettings() {
    eventNameInput.value = 'school';
    eventDateInput.valueAsDate = new Date('2023-08-22');
    eventTimeInput.value = '08:30';
    timeZoneInput.value = timeZoneOffset / (60 * 1000);
    showWeeksCheckbox.checked = showWeeks;
    showDaysCheckbox.checked = showDays;
    showHoursCheckbox.checked = showHours;
    showMinutesCheckbox.checked = showMinutes;
    showSecondsCheckbox.checked = showSeconds;
    showMillisecondsCheckbox.checked = showMilliseconds;
  }
  
  function toggleSettings() {
    settings.style.display = settings.style.display === 'block' ? 'none' : 'block';
    if (settings.style.display === 'block') {
      updateSettings();
    } else {
      updateCountdown();
    }
  }

  function updateSettings() {
    eventDate = new Date(`${eventDateInput.value}T${eventTimeInput.value}`);
    timeZoneOffset = Number(timeZoneInput.value) * 60 * 1000;
    showWeeks = showWeeksCheckbox.checked;
    showDays = showDaysCheckbox.checked;
    showHours = showHoursCheckbox.checked;
    showMinutes = showMinutesCheckbox.checked;
    showSeconds = showSecondsCheckbox.checked;
    showMilliseconds = showMillisecondsCheckbox.checked;

    updateCountdown();
  }

  settingsBtn.addEventListener('click', toggleSettings);

  // Call the initializeSettings function initially to set the settings' input values
  initializeSettings();

  // Add event listeners to each setting's input element to update the countdown when any setting is changed
  eventNameInput.addEventListener('change', updateSettings);
  eventDateInput.addEventListener('change', updateSettings);
  eventTimeInput.addEventListener('change', updateSettings);
  timeZoneInput.addEventListener('change', updateSettings);
  showWeeksCheckbox.addEventListener('change', updateSettings);
  showDaysCheckbox.addEventListener('change', updateSettings);
  showHoursCheckbox.addEventListener('change', updateSettings);
  showMinutesCheckbox.addEventListener('change', updateSettings);
  showSecondsCheckbox.addEventListener('change', updateSettings);
  showMillisecondsCheckbox.addEventListener('change', updateSettings);

  // Call the updateCountdown function initially to show the countdown on page load
  updateCountdown();
});