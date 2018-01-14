function connectDatabase(){

		 const config = {

		  	apiKey: "AIzaSyDU86z190VEe6UBw_XvI26BUxpAnOLJpqg",
		    authDomain: "mrps-1b501.firebaseapp.com",
		    databaseURL: "https://mrps-1b501.firebaseio.com",
		    projectId: "mrps-1b501",
		    storageBucket: "mrps-1b501.appspot.com",
		    messagingSenderId: "198146595879"

		  };

  	firebase.initializeApp(config);
	
	return firebase.database();
}


function createTask(text){

	const Task = {
		description: text,
		completed: false,
		ownerid: undefined,
	
	}

	//push task to database

	return Task;
}


function createPageHandler(){


	const PageHandler = {

		completedTaskContainer : $(".completed-task-container"),
		incompleteTaskContainer: $(".incomplete-task-container"),
		completedTasks : [],
		incompleteTasks: [],

		addIncompleteTask : function(task){

			let taskElement = "<div class=\"task\">";
			taskElement += "<div class=\"task-text\">" + task.description + "</div>";
			taskElement += "<button type=\"button\" class=\"btn btn-success complete-btn\">";
			taskElement += "Complete" + "</button>";
			taskElement += "<button type=\"button\" class=\"btn btn-danger delete-btn\">";
			taskElement += "Delete" + "</button>";
			//create task element
			this.incompleteTaskContainer.append(taskElement);
		},

	}


	return PageHandler;

}

$(document).ready(function(){

	const Database = connectDatabase();
	const PageHandler = createPageHandler();


	$(document).on('click', '.new-task-btn', function(){

		const task = createTask("hello there!");
		PageHandler.addIncompleteTask(task);


	});

 

  

  	
  
 		
});