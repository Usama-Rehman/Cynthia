const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function cursor(xScale, yScale) {
    var cursor = document.getElementById('cursor');
    window.addEventListener('mousemove', (e)=> {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${xScale}, ${yScale})`;
        // console.log("ClientX: ", e.clientX, "ClientY: " ,e.clientY);
        // console.log("PageX: ", e.pageX, "PageY: " ,e.pageY);
    });
};


function firstPageAnimation() {
    var timeline = gsap.timeline();

    timeline.from(`nav` , {
        y: `-10`,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(`.overlay-elem`, {
        y: `0`,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .to(`#freelance .overlay .overlay-elem`, {
        y: `0`,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .from(`#hero-footer`, {
        y: 10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    });
};

var timeout;

function cursorSqueeze() {
    var xScale = 1;
    var yScale = 1;
    var xPreviousValue = 0;
    var yPreviousValue = 0;

    window.addEventListener("mousemove", function (e) {
        clearTimeout(timeout);
        var xDifference = e.clientX - xPreviousValue;
        var yDifference = e.clientY - yPreviousValue;
        //   console.log(`xDifference: ${xDifference}, yDifference: ${yDifference}`);

        xScale = gsap.utils.clamp(0.8, 1.2, xDifference);
        yScale = gsap.utils.clamp(0.8, 1.2, yDifference);

        xPreviousValue = e.clientX;
        yPreviousValue = e.clientY;

        cursor(xScale, yScale);
        timeout = setTimeout(() => {
            var cursor = document.getElementById('cursor');
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1, 1)`;
        }, 100);
    });
};



function imageRotate() {
    document.querySelectorAll(`.elem`).forEach(element => {
        var previousValue = 0;
        var difference = 0;
        element.addEventListener('mousemove', function (e) {
            difference = e.clientX - previousValue;
            previousValue = e.clientX; 
    
            gsap.to(element.querySelector(`img`), {
                // display: `block`,
                opacity: 1,
                ease: Power3,
                top: e.clientY - element.getBoundingClientRect().top,
                left: e.clientX,
                rotate: gsap.utils.clamp(-10, 10, difference * 0.5)
            });
            // console.log(element.getBoundingClientRect());
        });

        element.addEventListener('mouseleave', function () {
            gsap.to(element.querySelector(`img`), {
                // display: `none`,
                opacity: 0,
                ease: Power2,
            });
            // console.log(element.getBoundingClientRect());
        });
        
    });  
};



cursor();
firstPageAnimation();
cursorSqueeze();
imageRotate();