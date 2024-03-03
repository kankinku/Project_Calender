let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
let events_left = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events_left')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const eventReadyInput = document.getElementById('eventReadyInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//openModal
function openModal(date) {
  clicked = date;
  //event day = num
  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }
  backDrop.style.display = 'block';
}

//displayCalender
function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('YearDisplay').innerText = `${year}`;
  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    //daySquare === div . day
    const dayString = `${year}/${month + 1}/${i - paddingDays}`;

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      //달력에 이벤트 디스플레이
      if (eventForDay) {
          const eventDiv = document.createElement('div');
          eventDiv.classList.add('event');
          eventDiv.setAttribute('data-date', eventForDay.date);  // 이벤트 날짜를 속성으로 추가

          const eventDay = document.createElement('div');
          const ready = document.createElement('div');
          const title = document.createElement('div');
          const sideBar= document.createElement('div');

          eventDay.classList.add('eventDay');
          ready.classList.add('ready');
          title.classList.add('title');
          sideBar.classList.add('sideBar');

          eventDay.innerText = eventForDay.date;
          title.innerText = eventForDay.title;
          ready.innerText = eventForDay.Ready;
          clicked = eventForDay.date;

          // daySquare에 eventDiv 추가
          daySquare.appendChild(eventDiv.cloneNode(true));  // 복제하여 추가

          const leftArea = document.getElementById('leftArea');
          
          // 현재 이벤트와 동일한 날짜를 가진 이벤트가 있다면 제거
          const existingEvent = leftArea.querySelector(`.event[data-date='${eventForDay.date}']`);
          if (existingEvent) {
            existingEvent.remove();
          }

          // 현재 delete하면 가장 위에 것이 삭제되는 문제가 발생한다. (1번을 선택해도 2번이 삭제됨)
          eventDiv.addEventListener('click', () => {
            
            console.log(clicked)
            //event day = num
            const eventForDay = events.find(e => e.date === clicked);
          
            if (eventForDay) {
              document.getElementById('eventText').innerText = eventForDay.title;
              deleteEventModal.style.display = 'block';
            } else {
              newEventModal.style.display = 'block';
            }
            backDrop.style.display = 'block';
          })

          // leftArea에 eventDiv 추가
          leftArea.appendChild(eventDiv);  // 원본 eventDiv 추가
          eventDiv.appendChild(eventDay)
          eventDiv.appendChild(title)
          eventDiv.appendChild(ready)
          eventDiv.appendChild(sideBar)
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

  

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

//달력에 Event추가
function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
      Ready: eventReadyInput.value
    });

    localStorage.setItem('events', JSON.stringify(events));

    events_left.push({
      date: clicked,
      title: eventTitleInput.value,
      Ready: eventReadyInput.value
    });

    localStorage.setItem('events_left', JSON.stringify(events_left));

    closeModal();

  } else {
    eventTitleInput.classList.add('error');
  }
}


function deleteEvent() {
  // 'events'와 'events_left' 배열에서 이벤트 삭제
  events = events.filter(e => e.date !== clicked);
  events_left = events_left.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  localStorage.setItem('events_left', JSON.stringify(events_left));

  // 'leftArea' 요소 내의 이벤트 중에서 배열에 없는 이벤트만 삭제
  const leftArea = document.getElementById('leftArea');
  const eventDivs = Array.from(leftArea.getElementsByClassName('event'));
  eventDivs.forEach(div => {

    const eventDate = div.getAttribute('data-date');

    if (!events_left.find(e => e.date === eventDate)) {
      // 이벤트가 'events_left' 배열에 없을 경우 삭제
      div.remove();
    }
    
  });

  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);

  document.getElementById('cancelButton').addEventListener('click', closeModal);

  document.getElementById('deleteButton').addEventListener('click', deleteEvent);

  document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();

const time = document.getElementById('current-time'); // id가 'current-time'인 요소

// 1초마다 현재 시각 업데이트
setInterval(() => {
    const date = new Date(); // 새로운 Date 객체 생성
    time.innerHTML = date.toLocaleTimeString();
}, 1000);