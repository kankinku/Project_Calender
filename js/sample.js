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


// leftArea > eventDay
function openModaleft(그 이벤트의 날자) {
    clicked = date; // clicked에 그 이벤트 날자 넣고
    //event day = num
    const eventForDay = events.find(e => e.date === clicked);
        clicked에 있는 
    if (eventForDay) {
      document.getElementById('eventText').innerText = eventForDay.title;
      //이벤트 날자를 출력하고
      deleteEventModal.style.display = 'block';
      //deletEventModal을 열기
    } 
    backDrop.style.display = 'block';
  }
  