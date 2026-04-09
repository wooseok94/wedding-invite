const slider = document.querySelector(".slider");

let isDown = false;
let startX;
let startPosition = 0;
let position = 0;

function getClientX(e) {
    // 터치와 마우스 좌표를 통합해서 가져옴
    return e.touches ? e.touches[0].clientX : e.clientX;
}

function startDrag(e) {
    isDown = true;
    slider.style.transition = 'none'; // 드래그 중엔 즉각 반응
    startX = getClientX(e);
    startPosition = position;
}

function moveDrag(e) {
    if (!isDown) return;

    const x = getClientX(e);
    const walk = x - startX;

    // 이동 거리 계산
    let newPosition = startPosition + walk;

    // 한계 지점 설정
    const minPosition = -(slider.scrollWidth - window.innerWidth + 40);
    const maxPosition = 0;

    // 슬라이더 끝에 도달했을 때 약간의 저항감(고무줄 효과)을 주거나 딱 멈추게 설정
    position = Math.max(minPosition, Math.min(maxPosition, newPosition));

    // 아이폰 성능을 위해 translateX 대신 translate3d 사용
    slider.style.transform = `translate3d(${position}px, 0, 0)`;
}

function endDrag() {
    isDown = false;
    slider.style.transition = 'transform 0.3s ease-out'; // 놓았을 때 부드러운 마무리
}

// 이벤트 연결
slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag, { passive: true }); // passive: true로 성능 향상

window.addEventListener("mousemove", moveDrag);
window.addEventListener("touchmove", moveDrag, { passive: true });

window.addEventListener("mouseup", endDrag);
window.addEventListener("touchend", endDrag);