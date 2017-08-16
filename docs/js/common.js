'use strict';

   
     // Create a "close" button and append it to each list item
     function addIconsData(){
        var myNodelist = document.getElementsByClassName("js-name");
        var myItemList = document.getElementsByClassName("js-task");
         var removeTag, removeIcon, numberTag, numberCount, taskNumber, taskName;
        for (var i = 0; i < myNodelist.length; i++) {
                removeTag = document.createElement("span");
                removeIcon = document.createTextNode("\u00D7");
                removeTag.className = "close";
                removeTag.appendChild(removeIcon);
                myNodelist[i].appendChild(removeTag);

               
                numberTag = document.createElement("span");
                numberCount = document.createTextNode(i+1);
                // var domListNumber = document.getElementsByClassName("js-name");
                numberTag.className = 'number';
                numberTag.appendChild(numberCount);
                myNodelist[i].appendChild(numberTag);

                taskNumber = myNodelist[i].children[1].innerText;
                $(myItemList[i]).attr('data-number', taskNumber);
                taskName = myNodelist[i].childNodes[0].textContent;
                $(myItemList[i]).attr('data-name', taskName);
        }
     }
    addIconsData();
    
   
    // Click on a close button to hide the current list item

    function taskClose(){
        var close = document.getElementsByClassName("close");
        var i;
        for (i = 0; i < close.length; i++) {
            close[i].onclick = function() {
                var task = this.parentElement;
                var des = $(task).next();
                task.remove();
                if($(des).hasClass('js-des')) {
                    des.remove();
                }
                
            }
        }
    }
    taskClose();
    

    // Create a new list item when clicking on the "Add" button
     function newElement() {
        var liName = document.createElement("LI");
        liName.className = "js-name";
        var inputName = document.getElementById("js-input").value;
        var tName = document.createTextNode(inputName);
        liName.appendChild(tName);

        var liDes = document.createElement("LI");
        liDes.className = "js-des";
        liDes.style.display = "none";
        var inputDes = document.getElementById("js-textarea").value;
        var tDes = document.createTextNode(inputDes);
        liDes.appendChild(tDes);

        var liChild = document.createElement("LI");
        liChild.className = "js-task";
        var liChildUl = document.createElement("UL");
        liChild.appendChild(liChildUl);
        liChildUl.appendChild(liName);
        liChildUl.appendChild(liDes);

        if (inputName === '' || inputDes === '' ) {
                alert("You must write task name and task description!");
        } else {
            document.getElementById("js-ul").appendChild(liChild);
        }
        document.getElementById("js-input").value = "";
        document.getElementById("js-textarea").value = "";

        addIconsData();
        taskClose();
               
    }
          
    $(document).on('click', function(el){
         
        if($(el.target).hasClass('js-name')) {
            el.target.classList.toggle('checked');

            var taskDes = el.target.nextElementSibling;
            if($(taskDes).hasClass('js-des')) {
                 $(taskDes).toggle();
            }
           
        }

        var $task = $('#js-ul'),
        $taskChild = $task.children('.js-task');

        if($(el.target).hasClass('js-number')) {
            $taskChild.sort(function(a,b){
                var aNum = a.getAttribute('data-number'),
                    bNum = b.getAttribute('data-number');

                if(aNum < bNum) {
                    return 1;
                }
                if(aNum > bNum) {
                    return -1;
                }
                return 0;
            });
            $taskChild.detach().appendTo($task);
        }

        if($(el.target).hasClass('js-name-des')) {
            $taskChild.sort(function(c,d){
                var aName = c.getAttribute('data-name'),
                    bName = d.getAttribute('data-name');

                if(aName > bName ) {
                    return 1;
                }
                if(aName < bName ) {
                    return -1;
                }
                return 0;
            });
            $taskChild.detach().appendTo($task);
        }       
    });