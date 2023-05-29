// const jsPlumb = require("jsplumb");

$(document).ready(function(){
    if(document.querySelector(".match-question")) {

        function compareNCalculateHeight(nthElemIndex, nPlusOneElemIndex) {
            var window_block = document.querySelectorAll(".match-question .match-block");
            if(window_block[nthElemIndex].offsetHeight > window_block[nPlusOneElemIndex].offsetHeight) {
                return window_block[nthElemIndex];
            } else {
                return window_block[nPlusOneElemIndex];
            }
        }
        function adjustMatchColumnHeight(columnElem, matchColumnId) {
            var getMatchColumnBlocks = columnElem;
            var total_height = 20;
            for(let i = 0; i < getMatchColumnBlocks.length; i=i+2) {
                var max_height_between_the_two_opposite_blocks = compareNCalculateHeight(i, i+1);
                getMatchColumnBlocks[i].style.height = max_height_between_the_two_opposite_blocks.offsetHeight + "px";
                getMatchColumnBlocks[i+1].style.height = max_height_between_the_two_opposite_blocks.offsetHeight+ "px";
                // if(i > 1) {
                    getMatchColumnBlocks[i].style.top = total_height + "px";
                    getMatchColumnBlocks[i+1].style.top = total_height + "px";
                    total_height = total_height + max_height_between_the_two_opposite_blocks.offsetHeight + 20;
                // } else {
    
                // }
            }
            document.getElementById(matchColumnId).style.height = total_height + "px";
        } 
        adjustMatchColumnHeight(document.querySelectorAll(".match-question .match-block"), "matchTheColumn1");
        // var getMatchColumnBlocksParent = document.querySelectorAll(".match-question");
        var matchColumnInstance = jsPlumb.getInstance({});
        matchColumnInstance.setContainer("matchTheColumn1");
        matchColumnInstance.bind("ready", function(){
            matchColumnInstance.registerConnectionTypes({
                "grey9E": {
                    paintStyle: {
                        stroke: "#8d939e",
                        strokeWidth: 3
                    },
                    hoverPaintStyle: {
                        stroke: "#8d939e",
                        strokeWidth: 4
                    }
                }
            });
            matchColumnInstance.addEndpoint("window1", {
                endpoint: "Dot",
                anchor: ["RightMiddle"],
                isSource: true
            });
            matchColumnInstance.addEndpoint("window2", {
                endpoint: "Dot",
                anchor: ["LeftMiddle"],
                isTarget: true
            });
            matchColumnInstance.addEndpoint("window3", {
                endpoint: "Dot",
                anchor: ["RightMiddle"],
                isSource: true
            });
            matchColumnInstance.addEndpoint("window4", {
                endpoint: "Dot",
                anchor: ["LeftMiddle"],
                isTarget: true
            });
            matchColumnInstance.addEndpoint("window5", {
                endpoint: "Dot",
                anchor: ["RightMiddle"],
                isSource: true
            });
            matchColumnInstance.addEndpoint("window6", {
                endpoint: "Dot",
                anchor: ["LeftMiddle"],
                isTarget: true
            });
            matchColumnInstance.addEndpoint("window7", {
                endpoint: "Dot",
                anchor: ["RightMiddle"],
                isSource: true
            });
            matchColumnInstance.addEndpoint("window8", {
                endpoint: "Dot",
                anchor: ["LeftMiddle"],
                isTarget: true
            });
        })
    
    }
});
