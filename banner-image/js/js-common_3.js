$(window).on("load", function () {


   

    /*! 
    * Feather Icons function 
    */
    feather.replace();

    /*! 
    * Subject Course Progress bar function
    */
    function progressReuse(progress_bar_elem) {
        for (let i = 0; i < progress_bar_elem.length; i++) {
            progress_bar_elem.eq(i).css({ "width": progress_bar_elem.eq(i).attr("aria-valuenow") + "%" });
        }
    }
    progressReuse($(".course-card .progress-bar"));
    progressReuse($(".card-self-study .progress-bar"));
    /*! 
    * Video component
    */
    var video_content = document.querySelectorAll(".video .video__content");
    for(var i = 0;i < video_content.length;i++) {
        video_content[i].addEventListener("click", function(){
            var self = this;
            if(!this.closest(".video").classList.contains("video--hide-top-content")) {
                this.closest(".video").classList.add("video--hide-top-content");
                this.closest(".video").querySelector("video").play();
                if(this.closest(".video--library") && !document.querySelector("#questionTime").classList.contains("popped-once")){
                    setTimeout(() => {
                        self.closest(".video").querySelector("video").pause();
                        document.querySelector("#questionTime").classList.add("popped-once");
                        var createModal = new bootstrap.Modal(document.querySelector("#questionTime"));
                        var questionModal = document.querySelector("#questionTime .modal-content");
                        createModal.show(questionModal);
                    }, 2000);
                }
            } else {
                if(this.closest(".video").querySelector("video").paused) {
                    this.closest(".video").querySelector("video").play();
                } else {
                    this.closest(".video").querySelector("video").pause();
                }
            }
        });
    }


    // $(".menu-dropdown .dropdown-item").on("click", function(){
    //     if($(window).width() < 991) {
    //         $(this).find(".megasubmenu").addClass("show");
    //         // $(this).closest(".has-megasubmenu").find(".megasubmenu").addClass("show");
    //     }
    // });
    // $(".menu-dropdown .dropdown-item .back-to-first-level").on("click", function(){
    //     if($(window).width() < 991) {
    //         // $(this).closest(".megasubmenu").hide();
    //         $(this).closest(".megasubmenu").removeClass("show");
    //     }
    // });

    $("#dropdownMenuClickableInside").on("show.bs.dropdown", function(){
        if($(window).width() < 991) {
            $("html, body").css({"overflow": "hidden"});
            $(this).closest(".helper-bar").find(".helper-bar__icon").addClass("hide-icon");
            $(this).closest(".helper-bar").find(".helper-bar__close").removeClass("hide-icon");
            if(document.querySelectorAll(".video .video__content")) {
                let video_content =  document.querySelectorAll(".video .video__content");
                for(var i = 0;i < video_content.length; i++) {
                    video_content[i].classList.add("negativeZIndex");
                }
            }
            if(document.querySelectorAll(".reader-block__nav-link-wrap")) {
                let reader_block_link = document.querySelectorAll(".reader-block__nav-link-wrap");
                for(var i = 0;i < reader_block_link.length; i++) {
                    reader_block_link[i].classList.add("negativeZIndex");
                }
            }
        }
    });
    $("#dropdownMenuClickableInside").on("hide.bs.dropdown", function(){
        if($(window).width() < 991) {
            $(this).closest(".helper-bar").find(".helper-bar__icon").removeClass("hide-icon");
            $(this).closest(".helper-bar").find(".helper-bar__close").addClass("hide-icon");
            $("html, body").removeAttr("style");
            setTimeout(function(){
                if(document.querySelectorAll(".video .video__content")) {
                    let video_content =  document.querySelectorAll(".video .video__content");
                    for(var i = 0;i < video_content.length; i++) {
                        video_content[i].classList.remove("negativeZIndex");
                    }
                }
                if(document.querySelectorAll(".reader-block__nav-link-wrap")) {
                    let reader_block_link = document.querySelectorAll(".reader-block__nav-link-wrap");
                    for(var i = 0;i < reader_block_link.length; i++) {
                        reader_block_link[i].classList.remove("negativeZIndex");
                    }
                }
            },300);
        }
    });

    $(".helper-bar .helper-bar__close").on("click", function(){
        if($(window).width() < 992) {
            $("#dropdownMenuClickableInside").dropdown("hide");
        }
    });

    if($(window).width() < 992) {
        $("#dropdownMenuClickableInside").attr("data-bs-auto-close", "false");
        $(".has-megasubmenu").attr("data-bs-toggle", "dropdown");
    } else {
        $("#dropdownMenuClickableInside").attr("data-bs-auto-close", "outside");
        $(".has-megasubmenu").attr("data-bs-toggle", "dropdown");
    }

    $(".sidebar .nav .nav-item").on("click", function(){
        if($(window).width() < 992) {
            $("#sidebarMenu").removeClass("show");
        }
    });

    $(".leftSidebar").on("click", function(){
        if($(window).width() < 992) {
            $("#navbarContent").removeClass("show");
        }
    });

    $(".rightSidebar").on("click", function(){
        if($(window).width() < 992) {
            $("#sidebarMenu").removeClass("show");
        }
    });

    /*! 
    * Show/Hide edit profile in accounts page
    */
    $(".info__show-edit-profile").on("click", function(){
       $(this).closest(".profile-info").find(".profile-info__detail").addClass("profile-info__hide");
       $(this).closest(".profile-info").find(".profile-info__edit-profile").removeClass("profile-info__hide");
    })

    $(".info__hide-edit-profile").on("click", function(){
       $(this).closest(".profile-info").find(".profile-info__detail").removeClass("profile-info__hide");
       $(this).closest(".profile-info").find(".profile-info__edit-profile").addClass("profile-info__hide");
    })

    // custom tooltip functionality
    $(".info-title-text").on("click", function(){
        $(this).closest(".tooltip-block").find(".custom-tooltip").addClass("open-tooltip");
    });
    $(".info-block__close-icon").on("click", function(){
        $(this).closest(".tooltip-block").find(".custom-tooltip").removeClass("open-tooltip");
    });

    // Custom pop show/hide
    $(".custom-pop__link").on("click", function(){
        $(this).closest(".custom-pop").find(".custom-pop__down").addClass("show-pop");
    });
    $(".custom-pop__close").on("click", function(){
        $(this).closest(".custom-pop").find(".custom-pop__down").removeClass("show-pop");
    });
});


    /**
     * Auto Complete Script 
     **/
    function autocomplete(inp, arr) {
        /*the autocomplete function takes two arguments,
        the text field element and an array of possible autocompleted values:*/
        var currentFocus;
        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("div");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("div");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });
        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                /*If the arrow DOWN key is pressed,
                increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 38) { //up
                /*If the arrow UP key is pressed,
                decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode == 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            /*add class "autocomplete-active":*/
            x[currentFocus].classList.add("autocomplete-active");
        }

        function removeActive(x) {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }

        function closeAllLists(elmnt) {
            /*close all autocomplete lists in the document,
            except the one passed as an argument:*/
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }

    /*An array containing all the Global Search items*/
    var searchlist = ["ICSC", "CBSE", "Kerala State Board", "Tamil Nadu State Board", "Government Exams", "CA", "Artisan Wool", "Government Exams","ICSC", "CBSE", "Kerala State Board", "Tamil Nadu State Board", "Government Exams", "CA", "Artisan Wool", "Government Exams"]

    /*initiate the autocomplete function on the "search" element, and pass along the searchlist array as possible autocomplete values:*/
    if(document.getElementById("searchItems")) {
        autocomplete(document.getElementById("searchItems"), searchlist);
    }


    /*! 
    * Onmouse up get selected text valueZ
    */
    var selectedTextString = "";
    document.onmouseup = function() {
        if(document.querySelector("#textToSelect")) {
            selectedTextString = getSelectionText();
        }
        //   console.log("slren", selectedTextString);
    };
    // // highlight text logic
    function getSelectionText() {
        var text = "";
        var selectedEl = "";
        var sel;
        var activeEl = document.activeElement;
        var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
        if (
          (activeElTagName == "textarea") || (activeElTagName == "input" &&
          /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
          (typeof activeEl.selectionStart == "number")
        ) {
            text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
        } else if (window.getSelection) {
            sel = window.getSelection();
            text = window.getSelection().toString();
            selectedEl = sel.getRangeAt(0).commonAncestorContainer;
            if (selectedEl.nodeType != 1) {
                if(selectedEl.tagName === "SPAN" && selectedEl.classList.contains("reader-block__made-note")) {
                    selectedEl = selectedEl;
                } else {
                    selectedEl = selectedEl.parentNode;
                }
            }
    
        } else if ( (sel = document.selection) && sel.type != "Control") {
            parentEl = sel.createRange().parentElement();
        }
        return ({
            text: text,
            selectedEl: selectedEl
        });
    }
    var uniqueRandomId = function () {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    function markSelectedText() {
        // console.log("slren", selectedTextString.selectedEl);
        // var highestHiglightedDataAttr = $("reader-block__made-note").
        var slectedTextElement = selectedTextString.selectedEl;
        var innerHTML = slectedTextElement.innerHTML;
        var index = innerHTML.indexOf(selectedTextString.text);
        // console.log("span", innerHTML.substring(index,index+selectedTextString.text.length).style.backgroundColor);
        if (index >= 0) { 
            // if(index.parentNode.classList.contains("reader-block__made-note")) {
            //     innerHTML = innerHTML.substring(0,index) + innerHTML.substring(index,index+selectedTextString.text.length) + innerHTML.substring(index + selectedTextString.text.length);
            //     slectedTextElement.innerHTML = innerHTML;
            // } else {
                innerHTML = innerHTML.substring(0,index) + "<sup class='reader-block__note-icon' data-bs-toggle='modal' data-bs-target='#makeANote'><img src='./assets/images/note-icon-pink.svg' alt=''></sup><span class='reader-block__made-note' id='" + uniqueRandomId() + "'>" + innerHTML.substring(index,index+selectedTextString.text.length) + "</span>" + innerHTML.substring(index + selectedTextString.text.length);
                slectedTextElement.innerHTML = innerHTML;
            // }
        }
    }
    
    function unmarkSelectedText(thisElem) {
        // console.log("slren", selectedTextString.selectedEl);
    
        let slectedTextElement = selectedTextString.selectedEl.id;
        console.log("lkjhg", selectedTextString.selectedEl.id);
        // select element to unwrap
    
        var el = document.querySelector("#" + slectedTextElement);
    
        // // get the element's parent node
        if(el.classList.value === "reader-block__made-note") {
            var parent = el.parentNode;
        }
    
        // // // move all children out of the element
        parent.insertBefore(el.firstChild, el);
    
        // // remove the empty element
        el.previousElementSibling.remove();
        parent.removeChild(el);
    }

    /*! 
    * Text highlight popup logic
    */
   $(document).ready(function () {
        function tweetButtonClick() {
        let selectedText = document.getSelection().toString();
        /*window.open(
                "https://twitter.com/intent/tweet?url=https://www.linkedin.com/in/harsha-vardhan-ch-245197bb/&text=" +
                selectedText
            );*/
        console.log("This is your selected text: ", selectedText);
        }

        const textSelectionTooltipContainer = document.createElement("div");
        textSelectionTooltipContainer.setAttribute(
        "id",
        "textSelectionTooltipContainer"
        );

        // <a href="javascript:void(0)" id="translate-text">Translate</a>
        textSelectionTooltipContainer.innerHTML = `
        <a href="javascript:void(0)" id="mark-text" onclick="markSelectedText()">Highlight Text</a>
        <a href="javascript:void(0)" class="d-none" id="unmark-text" onclick="unmarkSelectedText(this)">Dehighlight Text</a>
        <a href="javascript:void(0)" id="note-text" data-bs-toggle="modal" data-bs-target="#addComment">Add Comment</a>`;
        const bodyElement = document.getElementsByTagName("BODY")[0];

        $("body").on("click", "#textShareTwitterBtn", tweetButtonClick);

        bodyElement.addEventListener("mouseup", function (e) {
            var textu = document.getSelection().toString();
            if (!textu.length) {
                if(document.querySelector("#textToSelect")) {
                    document.querySelector("#mark-text").classList.remove("d-none");
                    document.querySelector("#unmark-text").classList.add("d-none");
                }
                textSelectionTooltipContainer.remove();
            }
        });
        if (document.getElementById("textToSelect")) {

            document
                .getElementById("textToSelect")
                .addEventListener("mouseup", function (e) {
                let textu = document.getSelection().toString();
                let matchu = /\r|\n/.exec(textu);

                    // open tooltip
                    if (textu.length && !matchu) {
                        let range = document.getSelection().getRangeAt(0);
                        let rect = range.getBoundingClientRect();
                        let scrollPosition = $(window).scrollTop();
                        let containerTop = scrollPosition + rect.top - 50 + "px";
                        let containerLeft = rect.left + rect.width / 2 - 50 + "px";
                        textSelectionTooltipContainer.style.transform =
                        "translate3d(" +
                        containerLeft +
                        "," +
                        containerTop +
                        "," +
                        "0px)";
                        bodyElement.appendChild(textSelectionTooltipContainer);
                    }

                    // Highlight/Unhighlight logic
                    if(document.getElementById(selectedTextString.selectedEl.id)) {
                        let slectedTextElement = selectedTextString.selectedEl.id;
                        // console.log("lj;ljhgg", selectedTextString.selectedEl.id);
            
                        let el = document.getElementById(slectedTextElement);
            
                        // // get the element's parent node
                        if(el.classList.contains("reader-block__made-note")) {
                            document.querySelector("#mark-text").classList.add("d-none");
                            document.querySelector("#unmark-text").classList.remove("d-none");
                        } else {
                            document.querySelector("#mark-text").classList.remove("d-none");
                            document.querySelector("#unmark-text").classList.add("d-none");
                        }
                    }
                });
            }
            
        /*!
        * Preloader (if the #preloader div exists)
        */
        // $(window).on('load', function () {
        //     if ($('#preloader').length) {
        //         $('#preloader').delay(100).fadeOut('slow', function () {
        //             $(this).remove();
        //         });
        //     }
        // });
        
        /*! 
        * Back to top button
        */ 
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn('slow');
                $('.chat-with-us').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
                $('.chat-with-us').fadeOut('slow');
            }
        });
        // $('.spinner-com').inputSpinner();
        $('.back-to-top').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 100);
            return false;
        });

        /*! 
        * Hamburger Function 
        */  
        $('.hamburger-icon, #hamburger').on('click', function () {
            $(this).toggleClass('open');
        });

        // counter animation
        $('.percentage-count-anim').each(function () {
            var $this = $(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
            duration: 3000,
            easing: 'swing',
            step: function () {
                $this.text(Math.ceil(this.Counter));
            }
            });
        });
        
        // homepage carousel component hide/show logic
        // $(".simple-card--selectable-tag").on("click", function(){
        //     if($(this).find(".select-class").hasClass("d-none")) {
        //         $(".simple-card--selectable-tag").find(".select-class").removeClass("d-none");
        //         $(".simple-card--selectable-tag").find(".select-board").addClass("d-none");
        //         $(this).closest(".card--carousel-wrap").find(".board").addClass("d-none");
        //         $(this).closest(".card--carousel-wrap").find(".class").removeClass("d-none");
        //         $(this).closest(".card--carousel-wrap").find(".card-back-link").removeClass("d-none");
        //     } else {
        //     }
        // });

        // $(".card--carousel-wrap .card-back-link").on("click", function(){
        //     $(".simple-card--selectable-tag").find(".select-class").addClass("d-none");
        //     $(".simple-card--selectable-tag").find(".select-board").removeClass("d-none");
        //     $(this).closest(".card--carousel-wrap").find(".board").removeClass("d-none");
        //     $(this).closest(".card--carousel-wrap").find(".class").addClass("d-none");
        //     $(this).addClass("d-none");
        // });

    });

    // Home Banner carousel
    $(".bannerCarousel").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        autoplay: true,
        autoplayTiemout: 1000,
        navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
        responsive: {
            0: {
                items: 1,
                nav: false,
                margin: 0,
            },
            600: {
                items: 1,
                nav: true
            },
            1000: {
                items: 1,
                nav: true
            }
        }
    });

    // courses package carousel
    $(".courses-package-carousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
        responsive: {
            0: {
                items: 1.2,
                nav: false,
                margin: 20,
            },
            600: {
                items: 1,
                nav: true
            },
            1000: {
                items: 1,
                nav: true
            }
        }
    });
    
    // courses package carousel
    $(".courses-package-search-carousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
        responsive: {
            0: {
                items: 1,
                nav: true,
                margin: 10,
            },
            768: {
                items: 1,
                nav: true,
                margin: 30
            },
            1024: {
                items: 2,
                nav: true,
                margin: 30
            },
            1200: {
                items: 2,
                nav: true,
                margin: 30
            }
        }
    });
     // courses package carousel
     $(".courses-package-class-carousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
        responsive: {
            0: {
                items: 1,
                nav: true,
                margin: 10,
            },
            768: {
                items: 1,
                nav: true,
                margin: 30
            },
            1024: {
                items: 2,
                nav: true,
                margin: 30
            },
            1200: {
                items: 3,
                nav: true,
                margin: 30
            }
        }
    });
    // tutor profile carousel
    $(".tutor-owl-carousel").owlCarousel({
        loop: false,
        margin: 10,
       

        autoplay:true,
        nav: true,
        navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
        responsive: {
            0: {
                items: 1,
                nav: false,
                margin: 20,
            },
            600: {
                items: 3,
                nav: true,
                margin: 30
            },
            1000: {
                items: 4,
                nav: true,
                margin: 30
            }
        }
    });
    // participants carousel
  $(".participants-carousel").owlCarousel({
    loop: false,
    margin: 10,
    nav: true,
    navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
    responsive: {
        0: {
            items: 1,
            nav: false,
            margin: 20,
        },
        600: {
            items: 2,
            nav: true,
            margin: 30
        },
        1000: {
            items: 3,
            nav: true,
            margin: 30
        }
    }
});

    // achievement carousel
    $(".achievement-carousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
        responsive: {
            0: {
                items: 1,
                nav: false,
                margin: 20,
            },
            600: {
                items: 3,
                nav: true,
                margin: 30
            },
            1000: {
                items: 4,
                nav: true,
                margin: 30
            }
        }
    });$(".learning-wall-carousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
        responsive: {
            0: {
                items: 1,
                nav: false,
                margin: 20,
            },
            600: {
                items: 1.5,
                nav: true,
                margin: 30
            },
            1000: {
                items: 2,
                nav: true,
                margin: 30
            }
        }
    });
    
  // undergraduates page profile carousel
    $(".ug-owl-carousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
        responsive: {
            0: {
                items: 1,
                nav: false,
                margin: 20,
            },
            600: {
                items: 3,
                nav: false,
                margin: 30
            },
            1000: {
                items: 4,
                nav: false,
                margin: 30
            }
        }
    });
  // Up-lp mentors page profile carousel
  $(".up-lp-mentors").owlCarousel({
    loop: false,
    margin: 10,
    nav: false,
    navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
    responsive: {
        0: {
            items: 1,
            nav: false,
            margin: 20,
        },
        600: {
            items: 3,
            nav: false,
            margin: 30
        },
        1000: {
            items: 4,
            nav: false,
            margin: 30
        }
    }
});
  // undergraduates page profile with 3 carousel iteam

    $(".ugthree-owl-carousel").owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        navText: ["<span class='d-flex justify-content-center align-items-center left-nav'><i data-feather='chevron-left'></i></span>","<span class='d-flex justify-content-center align-items-center right-nav'><i data-feather='chevron-right'></i></span>"],
        responsive: {
            0: {
                items: 1,
                nav: false,
                margin: 20,
            },
            600: {
                items: 2,
                nav: false,
                margin: 30
            },
            1000: {
                items: 3,
                nav: false,
                margin: 30
            }
        }
    });  

// fixed dropdown functionality
var fixedPosDesktopDropdown = document.querySelectorAll('.menu-dropdown--questions-fixed-pos .dropdown-toggle');
for(let i = 0; i < fixedPosDesktopDropdown.length; i++) {
    fixedPosDesktopDropdown[i].addEventListener('show.bs.dropdown', function () {
        // do something...
        let static_content = document.querySelector(".static-content");
        if(static_content && !static_content.classList.contains("shift-right") && window.innerWidth > 991) {
            static_content.classList.add("shift-right");
        }
    })
    fixedPosDesktopDropdown[i].addEventListener('hidden.bs.dropdown', function () {
        // do something...
        let static_content = document.querySelector(".static-content");
        if(static_content && static_content.classList.contains("shift-right") && window.innerWidth > 991) {
            static_content.classList.remove("shift-right");
        }
    })
}

// question navigation
$(".question-block .question-nav-link").on("click", function(){
    var navRef = $(this);
    var getActiveQuestionIndex = navRef.closest(".question-block").find(".content-slide.active");
    console.log("activeq", getActiveQuestionIndex.index());
    // var activeNavIndex = navRef.closest(".question-block").find(".content-slide.active").index();
    if(navRef.hasClass("left-nav")) {
        if(getActiveQuestionIndex.index() <= 1) {
            navRef.attr("disabled", "disabled");
            return;
        }
        navRef.closest(".question-block").find(".content-slide.active").removeClass("active").prev().addClass("active");
        if(typeof navRef.closest(".question-nav-wrap").find(".right-nav").attr("disabled") !== 'undefined' && navRef.closest(".question-nav-wrap").find(".right-nav").attr("disabled") !== false) {
            navRef.closest(".question-nav-wrap").find(".right-nav").removeAttr("disabled");
        }
    }
    if(navRef.hasClass("right-nav")) {
        if(getActiveQuestionIndex.index() >= navRef.closest(".question-block").find(".content-slide").length) {
            navRef.attr("disabled", "disabled");
            return;
        }
        navRef.closest(".question-block").find(".content-slide.active").removeClass("active").next().addClass("active");
        if(typeof navRef.closest(".question-nav-wrap").find(".left-nav").attr("disabled") !== 'undefined' && navRef.closest(".question-nav-wrap").find(".left-nav").attr("disabled") !== false) {
            navRef.closest(".question-nav-wrap").find(".left-nav").removeAttr("disabled");
        }
    }
});

// on keyup disable enable button 
if(document.querySelector("#makeNoteTextarea")) {
    var make_note_input = document.querySelector("#makeNoteTextarea");
    make_note_input.addEventListener("keyup", function(){
        if(make_note_input.value != "") {
            this.closest(".modal").querySelector("#save-btn").classList.remove("disabled");
        } else {
            this.closest(".modal").querySelector("#save-btn").classList.add("disabled");
        }
    });
}
if(document.querySelector("#addCommentTextarea")) {
    var add_comment_input = document.querySelector("#addCommentTextarea");
    add_comment_input.addEventListener("keyup", function(){
        if(add_comment_input.value != "") {
            this.closest(".modal").querySelector("#comment-save-btn").classList.remove("disabled");
        } else {
            this.closest(".modal").querySelector("#comment-save-btn").classList.add("disabled");
        }
    });
}
  
