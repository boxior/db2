'use strict';

   
     // Create a "close" button and append it to each list item
     function addIconsData(){
        var myNodelist = document.getElementsByClassName("task__name");
        var myItemList = document.getElementsByClassName("task__item");
        var removeTag, removeIcon, numberTag, numberCount, taskNumber, taskName;
        for (var i = 0; i < myNodelist.length; i++) {
            
                removeTag = document.createElement("span");
                removeIcon = document.createTextNode("\u00D7");
                removeTag.className = "close";
                removeTag.appendChild(removeIcon);
                myNodelist[i].appendChild(removeTag);

                numberTag = document.createElement("span");
                numberCount = document.createTextNode(i+1);
                // var domListNumber = document.getElementsByClassName("task__name");
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
                if($(des).hasClass('task__des')) {
                    des.remove();
                }
                
            }
        }
    }
    taskClose();
    

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
        } else {

           document.getElementById("task__items").appendChild(liChild);
           console.log(document.getElementsByClassName("task__items"));
        }
        document.getElementById("todo__name").value = "";
        document.getElementById("todo__description").value = "";

        addIconsData();
        taskClose();
               
    }
          
    $(document).on('click', function(el){
         
        if($(el.target).hasClass('task__name')) {
            el.target.classList.toggle('checked');

            var taskDes = el.target.nextElementSibling;
            if($(taskDes).hasClass('task__des')) {
                 $(taskDes).toggle();
            }
           
        }

        var $task = $('#task__items'),
        $taskChild = $task.children('.task__item');

        if($(el.target).hasClass('task__number')) {
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

        if($(el.target).hasClass('task__name-des')) {
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