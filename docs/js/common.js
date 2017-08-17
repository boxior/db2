'use strict';

    (function initTodo() {
        // init for default tasks
        addIconsData();
        taskClose();
        acordion();
        sortInit();
    })();

    // Acordion effect of Description Task
    function acordion(){
        $(document).on('click', function(el){
        if($(el.target).hasClass('task__name')) {
            el.target.classList.toggle('checked');

            var taskDes = el.target.nextElementSibling;
            if($(taskDes).hasClass('task__des')) {
                 $(taskDes).toggle();
            }
           
        }
    });
    }
    
    // Checking elements for a class
    function hasClassEl(el, className){
        if (el.classList) {
            return el.classList.contains(className);
        } else {
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        }
    }

     // Create a "close" button, "number" and data-attr of Name and Number and append it to each list item
    function addIconsData(){
        var myNodelist = document.getElementsByClassName("task__name");
        var myItemList = document.getElementsByClassName("task__item");
        var removeTag, removeIcon, numberTag, numberCount, taskNumber, taskName;

        for (var i = 0; i < myNodelist.length; i++) {
            
                removeTag = document.createElement("span");
                removeIcon = document.createTextNode("\u00D7");
                removeTag.className = "close";
                removeTag.appendChild(removeIcon);

                if ($(myNodelist[i]).find('.close')) {
                    $(myNodelist[i]).find('.close').remove();
                }
                myNodelist[i].appendChild(removeTag);

                numberTag = document.createElement("span");
                numberCount = document.createTextNode(i+1);
                numberTag.className = 'number';
                numberTag.appendChild(numberCount);
                if ($(myNodelist[i]).find('.number')) {
                    $(myNodelist[i]).find('.number').remove();
                }
                myNodelist[i].appendChild(numberTag);

                taskNumber = myNodelist[i].children[1].innerText;
                myItemList[i].setAttribute('data-number', taskNumber);
                taskName = myNodelist[i].childNodes[0].textContent;
                myItemList[i].setAttribute('data-name', taskName);
        }
    }
    
    // Click on a close button to hide the current list item
    function taskClose(){
        var close = document.getElementsByClassName("close");
        for (var i = 0; i < close.length; i++) {
            close[i].onclick = function() {
                var task = this.closest(".task__item");
                task.remove();
                console.log($('.task__item'));
            }
        }
    }
    
    // Create a new list item when clicking on the "Add" button
    function newElement() {
        var liName = document.createElement("LI");
        liName.className = "task__name";
        var inputName = document.getElementById("todo__name").value;
        var tName = document.createTextNode(inputName);
        liName.appendChild(tName);

        var liDes = document.createElement("LI");
        liDes.className = "task__des";
        liDes.style.display = "none";
        var inputDes = document.getElementById("todo__description").value;
        var tDes = document.createTextNode(inputDes);
        liDes.appendChild(tDes);

        var liChild = document.createElement("LI");
        liChild.className = "task__item";
        var liChildUl = document.createElement("UL");
        liChildUl.appendChild(liName);
        liChildUl.appendChild(liDes);
        liChild.appendChild(liChildUl);
        
        if (inputName === '' || inputDes === '' ) {
            alert("You must write task name and task description!");
            return;
        } else {
            document.getElementById("task__items").appendChild(liChild);
            console.log($('.task__item'));
        }

        // clear inputs
        document.getElementById("todo__name").value = "";
        document.getElementById("todo__description").value = "";

        addIconsData();
        taskClose();
               
    }
    
    // Sort function
    function sortInit() {
        document.getElementsByClassName('task__header')[0].onclick = function(el){
            
            var $task = $('#task__items');
            var $taskChild = $('.task__item');

            if(hasClassEl(el.target,'task__number')) {
                sortByNumber();
            } else if(hasClassEl(el.target,'task__name-des')) {
                sortByName();
            }

            function sortByNumber() {
                var isSortNum = false;

                if ($task.hasClass('sortNum')) {
                    $task.removeClass('sortNum');
                    isSortNum = false;
                } else {
                    $task.addClass('sortNum');
                    isSortNum = true;
                }
                                
                $taskChild.sort(function(a,b){
                    var aNum, bNum;

                    if (isSortNum) {
                        aNum = a.getAttribute('data-number'),
                        bNum = b.getAttribute('data-number');
                    } else {
                        bNum = a.getAttribute('data-number'),
                        aNum = b.getAttribute('data-number');
                    }
                    
                    if(aNum < bNum) {
                        return 1;
                    }
                    if(aNum > bNum) {
                        return -1;
                    }
                    return 0;
                });

                $taskChild.detach().appendTo($task);
                console.log($('.task__item'));
            }

            function sortByName() {
                var isSortName = false;

                if ($task.hasClass('sortName')) {
                    $task.removeClass('sortName');
                    isSortName = false;
                } else {
                    $task.addClass('sortName');
                    isSortName = true;
                }
                                
                $taskChild.sort(function(a,b){
                    var aNum, bNum;

                    if (isSortName) {
                        aNum = a.getAttribute('data-name'),
                        bNum = b.getAttribute('data-name');
                    } else {
                        bNum = a.getAttribute('data-name'),
                        aNum = b.getAttribute('data-name');
                    }

                    if(aNum > bNum ) {
                        return 1;
                    }
                    if(aNum < bNum ) {
                        return -1;
                    }
                    return 0;
                });
                $taskChild.detach().appendTo($task);
                console.log($('.task__item'));
            }
        }
    }