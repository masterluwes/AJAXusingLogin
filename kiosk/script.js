function showSceneryBox(event, imgSource, heading, description) {
    let d = document.getElementById("display");
    let e = document.body;

    // Disable scroll while the box is shown
    e.style.overflow = "hidden";

    // Position the display box relative to mouse pointer
    d.style.left = event.clientX + 5 + "px";
    d.style.top = event.clientY + 5 + "px";

    // Populate the display box with content
    d.innerHTML = `
        <div id='wrapper'>
            <img id='imgid' src='${imgSource}' alt='Image'>
            <p>${heading}</p>
            <p>${description}</p>
        </div>
    `;

    // Show the display box
    d.style.display = "block";

    // Update position on mouse move
    document.addEventListener('mousemove', displayFollowCamera);
}

function displayFollowCamera(event) {
    let a = document.getElementById('display');
    a.style.left = event.clientX + 5 + "px";
    a.style.top = event.clientY + 5 + "px";
}

function removeSceneryBox() {
    let d = document.getElementById("display");
    let e = document.body;

    // Enable scrolling again
    e.style.overflow = "";

    // Hide and clear the display box
    d.style.display = "none";
    d.innerHTML = "";

    // Remove the mousemove event listener
    document.removeEventListener('mousemove', displayFollowCamera);
}