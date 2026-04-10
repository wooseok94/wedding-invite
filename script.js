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

// 카카오 초기화 (JavaScript 키 입력)

Kakao.init('eec407ad50205d21489eb155bd4f8567');
Kakao.isInitialized();

function shareKakao() {
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: '김우석 ♥ 신한영 결혼합니다',
            description: '2026년 6월 20일 토요일 오후 12시 10분',
            imageUrl:
                'https://wooseok94.github.io/wedding-invite/img/1.jpg', // 메시지에 보일 대표 이미지 주소
            link: {
                mobileWebUrl: 'https://wooseok94.github.io/wedding-invite/',
                webUrl: 'https://wooseok94.github.io/wedding-invite/',
            },
        },
        buttons: [
            {
                title: '모바일 청첩장 보기',
                link: {
                    mobileWebUrl: 'https://wooseok94.github.io/wedding-invite/',
                    webUrl: 'https://wooseok94.github.io/wedding-invite/',
                },
            },
        ],
    });
}
// ⭐ 1. 토스트 알림을 위한 HTML 요소를 동적으로 추가
document.addEventListener('DOMContentLoaded', () => {
    const toastDiv = document.createElement('div');
    toastDiv.id = 'toast';
    toastDiv.textContent = '링크가 복사되었습니다.';
    document.body.appendChild(toastDiv);
});

// ⭐ 2. 토스트 알림을 보여주는 함수
function showToast() {
    const toast = document.getElementById('toast');
    if (!toast) return;

    // 이미 떠 있다면 중복 실행 방지
    if (toast.classList.contains('show')) return;

    // 'show' 클래스 추가
    toast.classList.add('show');

    // 2초(2000ms) 후에 'show' 클래스 제거
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// ⭐ 3. URL 복사 함수 (알럿을 토스트로 변경)
function copyToClipboard() {
    // 현재 페이지의 URL 가져오기
    const currentUrl = window.location.href;

    // 클립보드에 복사
    navigator.clipboard.writeText(currentUrl).then(() => {
        // 복사 성공 시 토스트 알림 실행
        showToast();
    }).catch(err => {
        // 예외 처리 (오래된 브라우저 등)
        console.error('복사 실패:', err);

        // 구형 방식 (fallback)
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast(); // 성공 시 토스트 알림
        } catch (err) {
            alert("복사 실패했습니다. 주소창의 링크를 직접 복사해주세요."); // 최후의 보루
        }
        document.body.removeChild(textArea);
    });
}