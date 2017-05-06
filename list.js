window.onload = function () {

    tasksDesc = document.getElementById('tasks-header-desc')
    adventuresDesc = document.getElementById('adventures-header-desc')
    var taskList = document.createElement('ul');
    taskList.className = 'task-list'
    taskList.setAttribute('id', 'task-list');
    var adventureList = document.createElement('ul');
    adventureList.setAttribute('id', 'adventure-list');
    adventureList.className = 'adventure-list';
    tasksHeader = document.createElement('h1');
    tasksHeader.classList.add('tasks-header');
    tasksHeader.innerText = 'Tasks';
    adventuresHeader = document.createElement('h1');
    adventuresHeader.classList.add('adventures-header');
    adventuresHeader.innerText = 'Adventures';

    document.body.appendChild(adventuresHeader);
    document.body.appendChild(adventureList);
    document.body.appendChild(tasksHeader);
    document.body.appendChild(taskList);

    var taskInfoList;
    taskInfoList = [
        {
            description: "a dinosaur",
            points: 10,
        }, {
            description: "BOAT!",
            points: 10,
        }, {
            description: "something stolen from another participant who isn't on your team",
            points: 70,
        }, {
            description: "how did I take that picture?",
            points: 20,
        }, {
            description: "Darth Vader",
            points: 15,
        }, {
            description: "retrieve the most convincing religious flyer",
            points: 20,
        }, {
            description: "a Toynbee tile",
            points: 30,
        }, {
            description: "an act of sabotage",
            points: 10,
        }, {
            description: "team member in handcuffs",
            points: 70,
        }, {
            description: "something with the same initials as a team member",
            points: 10,
        }, {
            description: "the aftermath of a theft",
            points: 20,
        }, {
            description: "paint drying",
            points: 10,
        }, {
            description: "RETRIEVE something none of the judges can identify",
            points: 40,
        }, {
            description: "RETRIEVE an item of clothing that Jeff will have to wear at the bar.",
            points: 10,
        }, {
            description: "RETRIEVE a misspeling.",
            points: 10,
        }, {
            description: "RETRIEVE an arrow.",
            points: 10,
        }, {
            description: "a joke",
            points: 10,
        }, {
            description: "RETRIEVE a screw",
            points: 10,
        }, {
            description: "RETRIEVE a reflection",
            points: 10,
        }, {
            description: "something round with corners",
            points: 20,
        },
    ];

    var adventureInfoList;
    adventureInfoList = [
        {
            name: "Rodent's Delight",
            description: "Take a photo of the worst subway platform you can find.",
        }, {
            name: "Dr. Acula",
            description: "A photo that somehow involves a vampire and a doctor.",
        }, {
            name: "Brought to you by the BBC",
            description: "Something straight out of Black Mirror.",
        }, {
            name: "Inanimate Doppelgänger",
            description: "Photo of a team member with a lookalike, but it can't be a person.",
        }, {
            name: "Crowdpleaser",
            description: "Retrieve or photograph something that pleaseth the crowd.",
        }, {
            name: "Worse Than Guernica",
            description: "Photo of the worst street art you can find.",
        }, {
            name: "Cock in Hand",
            description: "Trick photo of yourself holding a statue of Samuel S. Cox in your hand.",
        }, {
            name: "Tourist Trap",
            description: "A photo of both team members (no selfies allowed, get someone to take it) in front of the weirdest choice of vista."
        }, {
            name: "Biggest Disappointment",
            description: "Photo of the biggest disappointment.",
        }, {
            name: "Where's Waldo",
            description: "Photo with one of your teammates in it but he's hard to find in the photo.",
        }, {
            name: "All Produce Great and Small",
            description: "RETRIEVE the grandest fruit and the smallest vegetable.",
        }, {
            name: "The Green Kilometer",
            description: "RETRIEVE the greenest leaf."
        }, {
            name: "Zeitgeist",
            description: "RETRIEVE a sign of the times.",
        }
    ];

    // <ul class='adventure-list'>
    //   <li class='adventure'>
    //     <input class='checkbox' type='checkbox'></input>
    //     <div>Adventure Name</div>
    //     <div>Adventure description.</div>
    //   </li>
    // </ul>
    
    // <ul class='task-list'>
    //   <li class='task'>
    //     <input class='checkbox' type='checkbox'></input>
    //     <div>task description.</div>
    //   </li>
    // </ul>
    
    var checkBoxHandler = function (el) {
        if (el.checked) {
            nameDescArray = el.id.split(';')
            var isAdventure = isNaN(nameDescArray[0]);
            var checkedList;
            if (isAdventure) {
                checkedList = JSON.parse(localStorage.getItem('adventureList'))
                if (!checkedList) {
                    checkedList = [];
                }
                checkedList.push({
                    name: nameDescArray[0],
                    description: nameDescArray[1]
                })
                localStorage.setItem('adventureList', JSON.stringify(checkedList))
            }
            else {
                checkedList = JSON.parse(localStorage.getItem('taskList'))
                if (!checkedList) {
                    checkedList = [];
                }
                checkedList.push({
                    points: parseInt(nameDescArray[0]),
                    description: nameDescArray[1],
                })
                localStorage.setItem('taskList', JSON.stringify(checkedList))
            }
        }
    }

    var generateElementForTask = function (task, index, checked) {
        var result = document.createElement('li');
        if (task.name) {
            result.className='adventure';
        } else {
            result.className='task';
        }
        result.setAttribute('id', 'task-' + index);
        var checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');
        checkBox.className = 'checkbox';
        var checkBoxId = '';
        if (task.name) {
            checkBoxId += (task.name + ';' );
        }
        else {
            checkBoxId += (task.points + ';');
        }
        checkBoxId += task.description;
        checkBox.setAttribute('id', checkBoxId);
        if (checked) {
            checkBox.setAttribute('checked', true);
        }
        checkBox.onclick = function () {checkBoxHandler(this);};
        result.appendChild(checkBox);
        var textSection;
        textSection = document.createElement('div');
        textSection.className = 'description';
        if (task.name) {
            nameSection = document.createElement('div');
            nameSection.innerText = task.name;
            nameSection.className = 'name';
            result.appendChild(nameSection);
        }
        textSection.innerText = task.description;
        if (!task.name) {
            nameSection = document.createElement('div');
            nameSection.innerText = task.points.toString();
            nameSection.className = 'points';
            result.appendChild(nameSection);
        }
        result.appendChild(textSection);
        return result;
    }

    var retrieveCheckedTasks = function (type) {
        result = JSON.parse(localStorage.getItem(type + 'List'));
        if (result) {
            return result;
        }
        else {
            return [];
        }
    }
    
    var taskItems = document.getElementById('task-list');
    var adventureItems = document.getElementById('adventure-list');
    var checkedTasks = retrieveCheckedTasks('task');
    var checkedAdventures = retrieveCheckedTasks('adventure');
    
    var populateLists = function () {
        var numCheckedTasks = checkedTasks.length;
        var numCheckedAdventures = checkedAdventures.length;
        var i;
        var task;
        var liEl;
        seenDescriptions = [];
        for (i=0; i < numCheckedTasks; i++) {
            task = checkedTasks[i];
            seenDescriptions.push(task.description);
            liEl = generateElementForTask(task, i, true);
            taskItems.appendChild(liEl);
        }
        for (var j=0; j < taskInfoList.length; j++) {
            var currentTask = taskInfoList[j];
            var currentTaskDescription = currentTask.description;
            if (seenDescriptions.indexOf(currentTaskDescription) === -1) {
                console.log(taskInfoList, i);
                task = taskInfoList[i];

                liEl = generateElementForTask(task, i, false);
                taskItems.appendChild(liEl);
                i++;
            }
        }
        i = 0;
        for (i=0; i < numCheckedAdventures; i++) {
            task = checkedAdventures[i];
            seenDescriptions.push(task.description);
            liEl = generateElementForTask(task, i, true);
            adventureItems.appendChild(liEl);
        }
        for (var k=0; k < adventureInfoList.length; k++) {
            var currentAdventure = adventureInfoList[k];
            var currentAdventureDescription = currentAdventure.description;
            if (seenDescriptions.indexOf(currentAdventureDescription) === -1) {
                task = adventureInfoList[i];
                liEl = generateElementForTask(task, i, false);
                adventureItems.appendChild(liEl);
                i++;
            }
        }
    }
    
    populateLists();
    
};

