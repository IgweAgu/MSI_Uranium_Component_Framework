// menu toggle
(function() {  
  
  // get the button and main menu
  var mainToggle = document.querySelector("#menu-toggle");
  var sideBar = document.querySelector("#sg-sidebar");
  
  // sidebar nav and sub-menu
  var toggleNav = Array.from(document.querySelectorAll(".nav-toggle"));
  //var subMenu = document.querySelector(".sub-menu");
  
  // https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  var forEachSideNav = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  };
  
  // set initial (closed menu) states
  mainToggle.setAttribute("aria-expanded", "false");
  mainToggle.hidden = false;
  sideBar.hidden = true;
  //subMenu.hidden = true;
 
  // open menu
  mainToggle.addEventListener("click", function() {
    // toggle menu visibility
    var expanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", String(!expanded));
    // swap text
    if (mainToggle.getAttribute("data-text-swap") == mainToggle.innerHTML) {
    mainToggle.innerHTML = mainToggle.getAttribute("data-text-original");
    } else {
      mainToggle.setAttribute("data-text-original", mainToggle.innerHTML);
      mainToggle.innerHTML = mainToggle.getAttribute("data-text-swap");
    }
    sideBar.hidden = expanded;
  }, false);
  
  // open sub menus
  forEachSideNav(toggleNav, function(i, el) {
    el.addEventListener("click", function() {      
      // toggle menu visibility
      var expanded = this.getAttribute("aria-expanded") === "true";
      // set aria state
      this.setAttribute("aria-expanded", String(!expanded));
      // set active class
      this.classList.toggle("active");
      // open sub menu
      this.nextSibling.hidden = expanded;
    });
  }, false);
  
})();

// open sidebar past 900px
(function () {
  
    var mainToggle = document.querySelector("#menu-toggle");
    var sideBar = document.querySelector("#sg-sidebar");
  
    // media query event handler
    if (matchMedia) {
      const mq = window.matchMedia("(min-width: 56.25em)");
      mq.addListener(WidthChange);
      WidthChange(mq);
    }

    // media query change
    function WidthChange(mq) {
      if (mq.matches) {
        
        // window width is at least 900px
        mainToggle.setAttribute("aria-expanded", "true");
        mainToggle.innerHTML = mainToggle.getAttribute("data-text-swap");
        sideBar.hidden = false;
      } else {
        // window width is less than 900px
        
        // set initial (closed menu) states
        mainToggle.setAttribute("aria-expanded", "false");
        mainToggle.innerHTML = mainToggle.getAttribute("data-text-original");
        sideBar.hidden = true;
      }
    }
  
})();

// content resize
(function() {
  
  // screen resize button and list
  var screenToggle = document.querySelector("#resize-toggle");
  var screenSizes = document.querySelector(".toggle-list"); 
  
  // screen resize buttons
  var screenSM = document.querySelector("#toggle-sm");
  var screenMD = document.querySelector("#toggle-md");
  var screenLG = document.querySelector("#toggle-lg");
  var screenFull = document.querySelector("#toggle-full");
  
  // content wrap
  var contentWrap = document.querySelector(".sg-content-wrap");
  
  var resizeButton = Array.from(document.querySelectorAll(".toggle-list button"));
  
  var forEachResizeButton = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]); // passes back stuff we need (find out more!)
    }
  };  
  
  // set initial (closed menu) states
  screenToggle.setAttribute("aria-expanded", "false");
  screenToggle.hidden = false;
  screenSizes.hidden = true;
  
  // open sub menus
  forEachResizeButton(resizeButton, function(i, el) {
    el.addEventListener("click", function() {
      document.querySelector(".toggle-list button.active").classList.remove("active");
      this.classList.add("active");
    });
  }, false);
  
  // open menu
  screenToggle.addEventListener("click", function() {
    // toggle menu visibility
    var expanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", String(!expanded));
    this.classList.toggle("active");
    // show screen size list
    screenSizes.hidden = expanded;
  }, false);
  
  // screen small
  screenSM.addEventListener("click", function() {
    // set screen size
    contentWrap.setAttribute("style", "max-width: 20em; min-width: 15em;")
    contentWrap.classList.add("active" , "active-sm")
    contentWrap.classList.remove("active-md" , "active-lg" , "active-xl")
    screenToggle.setAttribute("aria-expanded", "false")
    screenSizes.hidden = true
  }, false);
  
  // screen medium
  screenMD.addEventListener("click", function() {
    // set screen size
    contentWrap.setAttribute("style", "max-width: 50em;")
    contentWrap.classList.add("active" , "active-md")
    contentWrap.classList.remove("active-sm" , "active-lg" , "active-xl")
    screenToggle.setAttribute("aria-expanded", "false")
    screenSizes.hidden = true
    
  }, false);
  
  // screen large
  screenLG.addEventListener("click", function() {
    // set screen size
    contentWrap.setAttribute("style", "max-width: 85%;")
    contentWrap.classList.add("active" , "active-lg")
    contentWrap.classList.remove("active-sm" , "active-md" , "active-xl")
    screenToggle.setAttribute("aria-expanded", "false")
    screenSizes.hidden = true
    
  }, false)
  
  // screen full
  screenFull.addEventListener("click", function() {
    // set screen size
    contentWrap.setAttribute("style", "max-width: 100%;")
    contentWrap.classList.remove("active" , "active-sm" , "active-md" , "active-lg" , "active-xl")
    screenToggle.setAttribute("aria-expanded", "false")
    screenSizes.hidden = true
    
  }, false)
  
  // if screen less than 480px
  if (matchMedia) {
    const mqSM = window.matchMedia("(max-width: 23.438em)")
    mqSM.addListener(WidthChangeSM)
    WidthChangeSM(mqSM)
  }

  // media query change
  function WidthChangeSM(mqSM) {
    if (mqSM.matches) {     
      contentWrap.removeAttribute("style")
      contentWrap.classList.remove("active", "active-sm" , "active-md" , "active-lg")
      screenSM.classList.remove("active")
      screenMD.classList.remove("active")
      screenLG.classList.remove("active")
      screenFull.classList.add("active")
      screenToggle.setAttribute("aria-expanded", "false")
      screenSizes.hidden = true
      
    } else {

    }
  }
  
})();

// toggle code snippet
(function() {  
  
  var codeToggle = Array.from(document.querySelectorAll(".huge-module__toggle-code"));
  var codeSnippet = Array.from(document.querySelectorAll(".code-snippet"));
  
  var forEachCodePreview = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]);
    }
  };  
  
  codeSnippet.hidden = true;
  
  // open code snippet
  forEachCodePreview(codeToggle, function(i, el) {
    el.addEventListener("click", function() {
      var expanded = this.getAttribute("aria-expanded") === "true"
      this.setAttribute("aria-expanded", String(!expanded))
      this.nextElementSibling.hidden = expanded
      this.nextElementSibling.classList.toggle("active")
      this.classList.toggle("active")
    })
        
  }, false)
  
})();

// smooth scroll w/ offset
smoothScroll.init({
  selector: "[data-scroll]",
  speed: 1000,
  easing: "easeInOutCubic",
  offset: 50
});

