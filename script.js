document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const counter = document.querySelector('.counter');

    let currentIndex = 0;
    const totalImages = images.length;

    function updateSlider() {
        // ⭐ 가로로 이동하는 핵심 로직 (현재 인덱스 * 100%)
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 카운터 업데이트
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${totalImages}`;
        }
    }

    // 다음 버튼
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= totalImages) {
            currentIndex = 0; // 무한 반복
        }
        updateSlider();
    });

    // 이전 버튼
    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = totalImages - 1; // 무한 반복
        }
        updateSlider();
    });

    // 초기 상태 설정
    updateSlider();
});

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const counter = document.querySelector('.counter');

    let currentIndex = 0;
    const totalImages = images.length;

    // 터치 이벤트를 위한 변수
    let touchStartX = 0;
    let touchEndX = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${totalImages}`;
        }
    }

    // 다음/이전 로직
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSlider();
    }

    // 버튼 클릭 이벤트
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // ⭐ 스와이프(끌어서 넘기기) 기능 추가
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchStartX - touchEndX;

        // 최소 50px 이상 밀었을 때만 작동 (의도치 않은 터치 방지)
        if (swipeDistance > 50) {
            nextSlide(); // 왼쪽으로 밀면 다음 사진
        } else if (swipeDistance < -50) {
            prevSlide(); // 오른쪽으로 밀면 이전 사진
        }
    }

    updateSlider();
});

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const images = document.querySelectorAll('.slider img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const counter = document.querySelector('.counter');

    // 첫 번째와 마지막 이미지를 복사해서 앞뒤에 붙여넣기 (무한 루프의 핵심)
    const firstClone = images[0].cloneNode(true);
    const lastClone = images[images.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, images[0]);

    const allImages = document.querySelectorAll('.slider img');
    let currentIndex = 1; // 복사본이 앞에 있으므로 1번부터 시작
    const totalActualImages = images.length;

    function updateSlider(withAnimation = true) {
        if (withAnimation) {
            slider.style.transition = "transform 0.5s ease-out";
        } else {
            slider.style.transition = "none";
        }
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 카운터 표시 (복사본 인덱스 보정)
        let displayIndex = currentIndex;
        if (currentIndex === 0) displayIndex = totalActualImages;
        else if (currentIndex > totalActualImages) displayIndex = 1;

        if (counter) counter.textContent = `${displayIndex} / ${totalActualImages}`;
    }

    // 끝에 도달했을 때 눈속임으로 위치 이동
    slider.addEventListener('transitionend', () => {
        if (currentIndex === 0) {
            currentIndex = totalActualImages;
            updateSlider(false);
        }
        if (currentIndex === totalActualImages + 1) {
            currentIndex = 1;
            updateSlider(false);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex > totalActualImages) return;
        currentIndex++;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex <= 0) return;
        currentIndex--;
        updateSlider();
    });

    // 스와이프 로직 (동일하게 currentIndex 반영)
    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    slider.addEventListener('touchend', (e) => {
        const swipeDistance = touchStartX - e.changedTouches[0].screenX;
        if (swipeDistance > 50) nextBtn.click();
        else if (swipeDistance < -50) prevBtn.click();
    }, { passive: true });

    updateSlider(false);
});