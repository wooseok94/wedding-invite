const slider = document.querySelector(".slider");
const container = document.querySelector(".gallery"); // 부모 요소 기준

let isDown = false;
let startX;
let scrollLeft;
let position = 0;

function startDrag(e) {
    isDown = true;
    slider.style.transition = 'none'; // 드래그 중에는 애니메이션 끄기
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    startPosition = position;
}

function moveDrag(e) {
    if (!isDown) return;

    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const walk = x - startX;
    let newPosition = startPosition + walk;

    // 가동 범위 계산
    const minPosition = -(slider.scrollWidth - window.innerWidth + 40); // 40은 패딩값 예외처리
    const maxPosition = 0;

    // 범위 제한 (살짝 넘어가도 튕겨오는 느낌을 주려면 여기를 조절)
    position = Math.max(minPosition, Math.min(maxPosition, newPosition));

    slider.style.transform = `translateX(${position}px)`;
}

function endDrag() {
    isDown = false;
    slider.style.transition = 'transform 0.3s ease-out'; // 놓았을 때 부드럽게 멈춤
}

// 이벤트 리스너
slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag);

window.addEventListener("mousemove", moveDrag);
window.addEventListener("touchmove", moveDrag, { passive: false });

window.addEventListener("mouseup", endDrag);
window.addEventListener("touchend", endDrag);