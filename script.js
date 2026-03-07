const slider = document.querySelector(".slider");

let isDown = false;
let startX;
let startPosition;
let position = 0;

function startDrag(e) {
    isDown = true;
    slider.style.cursor = "grabbing";
    startX = e.pageX || (e.touches && e.touches[0].pageX);
    startPosition = position;
}

function endDrag() {
    isDown = false;
    slider.style.cursor = "grab";
}

function moveDrag(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX || (e.touches && e.touches[0].pageX);
    const deltaX = x - startX;
    position = startPosition + deltaX;
    const maxPosition = 0;
    const minPosition = -(slider.scrollWidth - slider.clientWidth);
    position = Math.max(minPosition, Math.min(maxPosition, position));
    slider.style.transform = `translateX(${position}px)`;
    console.log('Position:', position, 'Min:', minPosition, 'Max:', maxPosition);
}

slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag);

slider.addEventListener("mouseleave", endDrag);
slider.addEventListener("mouseup", endDrag);
slider.addEventListener("touchend", endDrag);

slider.addEventListener("mousemove", moveDrag);
slider.addEventListener("touchmove", moveDrag);

document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
});