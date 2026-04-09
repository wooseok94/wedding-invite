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