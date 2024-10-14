// digital+analog clock+date
function updateTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secondDegrees = ((seconds / 60) * 360) + 90;
  const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
  const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

  document.getElementById('second').style.transform = `rotate(${secondDegrees}deg)`;
  document.getElementById('minute').style.transform = `rotate(${minuteDegrees}deg)`;
  document.getElementById('hour').style.transform = `rotate(${hourDegrees}deg)`;

  const days = ['PO', 'ÚT', 'ST', 'ČT', 'PÁ', 'SO', 'NE'];
  const day = days[now.getDay()];
  const hoursString = hours.toString().padStart(2, '0');
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = seconds.toString().padStart(2, '0');
  const timeString = `${day}: ${hoursString} : ${minutesString} : ${secondsString}`;
  document.getElementById('time').textContent = timeString;
}

function getDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Měsíce jsou indexovány od 0
  const year = today.getFullYear();

  return `${day}.${month}.${year}`;
}

document.getElementById('date').innerText = getDate();

updateTime();
setInterval(updateTime, 100);

document.addEventListener('DOMContentLoaded', async () => {
  const elements = document.querySelectorAll('[data-day]');
  for (const element of elements) {
    const day = element.getAttribute('data-day');
    const tags = await loadTags(day);
    const plannerTags = element.querySelector('.plannerTags');
    for (const tag of tags) {
      const tagElement = document.createElement('div');
      tagElement.textContent = tag;
      tagElement.classList.add('tag', 'font6', 'semiBold', 'tagActive');
      plannerTags.appendChild(tagElement);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let openPopupBtns = document.querySelectorAll('.openPopupBtn');
  let closePopupBtn = document.getElementById('closePopupBtn');
  let popup = document.getElementById('popup8');
  let currentDay;

  openPopupBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentDay = btn.closest('.day').getAttribute('data-day');
      loadTags(currentDay).then(tags => {
        document.querySelectorAll('.popup .tag').forEach(tag => {
          if (tags.includes(tag.textContent.trim())) {
            tag.classList.add('tagActive');
          } else {
            tag.classList.remove('tagActive');
          }
        });
        popup.style.display = 'block';
      });
    });
  });

  let tags = document.querySelectorAll('.popup .tag');
  tags.forEach(function (tag) {
    tag.addEventListener('click', function () {
      tag.classList.toggle('tagActive');
    });
  });

  document.querySelector('.savePlannerBtn').addEventListener('click', async function () {
    const activeTags = [...new Set(Array.from(document.querySelectorAll('.popup .tag.tagActive')).map(tag => tag.textContent.trim()))];
    await saveTags(currentDay, activeTags);
    const plannerTags = document.querySelector(`.day[data-day="${currentDay}"] .plannerTags`);
    plannerTags.innerHTML = '';
    activeTags.forEach(tag => {
      const tagElement = document.createElement('div');
      tagElement.textContent = tag;
      tagElement.classList.add('tag', 'font6', 'semiBold', 'tagActive');
      plannerTags.appendChild(tagElement);
    });
    popup.style.display = 'none';
  });

  document.addEventListener('click', async function (event) {
    if (event.target.classList.contains('tag') && event.target.closest('.plannerTags')) {
      const dayElement = event.target.closest('.day');
      const day = dayElement.getAttribute('data-day');
      const tagText = event.target.textContent.trim();

      const tags = await loadTags(day);
      if (tags.includes(tagText)) {
        const updatedTags = tags.filter(tag => tag !== tagText);
        await saveTags(day, updatedTags);
        event.target.remove();
      }
    }
  });
});
