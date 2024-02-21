// 음성 인식 객체 생성
var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

recognition.lang = 'ko-KR';  // 언어 설정
recognition.interimResults = false;  // 중간 결과값 반환
recognition.maxAlternatives = 1;  // 결과값의 최대 개수

document.querySelector('#start').onclick = function() {
    // 음성 인식 시작
    recognition.start();


    // 새로운 div 생성
    var newDiv = document.createElement('div');
    newDiv.className = 'eventR';  // 클래스 이름 설정
    document.querySelector('#container').appendChild(newDiv);  // div 추가
}

// 음성 인식 결과 이벤트
recognition.onresult = function(event) {
    var speechResult = event.results[0][0].transcript;  // 인식된 음성 내용
    const leftArea = document.getElementById('leftArea');
    const sideBar= document.createElement('div');
    const speakArea = document.createElement('div');
    const onlySpeak = document.getElementById('eventRed');


    // 인식 결과 출력
    var divs = document.querySelectorAll('.eventR');
    var lastDiv = divs[divs.length - 1];  // 마지막 div 선택
    lastDiv.textContent = speechResult;
    sideBar.classList.add('sideBarRed');
    speakArea.classList.add('eventRed');
    leftArea.appendChild(speakArea);  
    speakArea.appendChild(lastDiv);  
    speakArea.appendChild(sideBar);  


    // 인식된 음성에 따라 이벤트 발생
    if (speechResult) {
        var event = new Event(speechResult);  // 이벤트 생성
        document.dispatchEvent(event);  // 이벤트 발생
    }

    speakArea.onclick = function() {
        // 삭제 확인
        var confirmDelete = confirm('이 이벤트를 삭제하시겠습니까?');
        if (confirmDelete) {
            // div 삭제
            this.parentNode.removeChild(this);
        }
    }
};

// 음성 인식 에러 이벤트
recognition.onerror = function(event) {
    console.log('Error occurred in recognition: ' + event.error);
}
