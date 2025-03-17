const bodyElement = document.querySelector("body");
/*
- Selects the <body> element from the document and stores it in the bodyElement variable.
- This will allow us to attach an event listener to the entire webpage.
*/
bodyElement.addEventListener("mousemove", (event) => {
    /*
    - Adds an event listener to bodyElement, listening for the "mousemove" event.
    - This means that every time the mouse moves, the function inside this event listener will execute.
    */
    /* 
    console.log("moved");
    console.log(event.offsetX);
    => These commented-out lines are for debugging purposes.
    - console.log("moved"); would print "moved" in the console whenever the mouse moves.
    - console.log(event.offsetX); would print the X-coordinate of the mouse pointer relative to the element (here, <body>).
    */
    const xPosition = event.offsetX;
    const yPosition = event.offsetY;
    /*
    👆
    Extracts the X and Y coordinates of the mouse pointer relative to the <body> and stores them in xPosition and yPosition.
    */
    const spanElement = document.createElement("span");
    /*
    - Creates a new <span> element dynamically in JavaScript.
    - This <span> element will be used to create a visual effect (such as hearts in a heart trail animation).
    */
    spanElement.style.left = xPosition + "px";
    spanElement.style.top = yPosition + "px";
    /*
    - Positions the newly created <span> element at the exact mouse pointer location by setting the left and top CSS properties.
    - This ensures that the effect follows the mouse cursor.
    */
    const size = Math.random() * 100;
    /*
    - Generates a random size for the <span> element between 0 and 100 pixels.
    - This randomization adds variety to the animation, making it look more natural.
    */
    spanElement.style.width = size + "px";
    spanElement.style.height = size + "px";
    /*
    - Sets the width and height of the <span> element to the randomly generated size value.
    - This makes each generated element vary in size.
    */
    bodyElement.appendChild(spanElement);
    /*
    - Adds the <span> element to the <body>, making it visible on the webpage.
    - Now, each time the mouse moves, a new <span> element is added to create the trail effect.
    */
    setTimeout(() => {
        spanElement.remove();
    }, 3000);
    /*
    - Sets a timer to remove the <span> element from the document after 3000 milliseconds (3 seconds).
    - This prevents the webpage from being overloaded with too many elements, keeping the animation smooth.
    */
})
/*
=> Summary of Working Mechanism:
1) When the mouse moves, the script detects its position (offsetX and offsetY).
2) It creates a new <span> element at the mouse pointer position.
3) The <span> element is given a random size.
4) The <span> element is added to the <body>, creating a visible effect.
5) After 3 seconds, the <span> element is removed to prevent clutter.
*/ 