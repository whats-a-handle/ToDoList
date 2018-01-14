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


function createTask(text,completed,id){

	const Task = {
		description: text,
		completed: completed,
		taskId: id,
		ownerId:undefined,
	}


	return Task;
}

function addTaskToDatabase(task, ownerId, Database){

	const taskRef = Database.ref('tasks');
	const key = taskRef.push().key;
	task.taskId = key;
	task.ownerId = ownerId;
	taskRef.push(task);
}

function addUserToDatabase(user, Database){

	const userRef = Database.ref('users');
	const key = userRef.push().key;
	user.id = key;
	userRef.push(key);

}

function createUser(){

	const User = {
		id:undefined
	}

	return User;
}



function getCompletedTasks(Database){

	const taskRef = Database.ref('tasks');
	const PageHandler = createPageHandler();
	PageHandler.clearCompleteTasks();
	taskRef.orderByChild("completed").equalTo(true).once("value",function(snapshot){

		for(let key in snapshot.val()){
			const task = createTask(snapshot.val()[key].description, snapshot.val()[key].completed, snapshot.val()[key].taskId);
			PageHandler.addCompleteTask(task);

		}

	});


}


function getIncompleteTasks(Database){

	const taskRef = Database.ref('tasks');
	const PageHandler = createPageHandler();
	PageHandler.clearIncompleteTasks();
	taskRef.orderByChild("completed").equalTo(false).once("value",function(snapshot){

		for(let key in snapshot.val()){	

			const task = createTask(snapshot.val()[key].description, snapshot.val()[key].completed, snapshot.val()[key].taskId);
			PageHandler.addIncompleteTask(task);

		}

	});


}


function createPageHandler(){


	const PageHandler = {
		taskDescriptionInput : $(".task-input"),
		completedTaskContainer : $(".completed-task-container"),
		incompleteTaskContainer: $(".incomplete-task-container"),
		completedTasks : [],
		incompleteTasks: [],

		clearTaskInput : function(){
			this.taskDescriptionInput.val("");
		},
		clearCompleteTasks : function(){

			this.completedTaskContainer.empty();
		},
		clearIncompleteTasks : function(){

			this.incompleteTaskContainer.empty();
		},

		addIncompleteTask : function(task){

			let taskElement = "<div class=\"task\">";
			taskElement += "<div class=\"task-text\">" + task.description + "</div>";
			taskElement += "<button type=\"button\" class=\"btn btn-success complete-btn\"taskid=\"" + task.taskId +"\">";
			taskElement += "Complete" + "</button>";
			taskElement += "<button type=\"button\" class=\"btn btn-danger delete-btn\"taskid=\"" + task.taskId +"\">";
			taskElement += "Delete" + "</button>";
			
			this.incompleteTaskContainer.append(taskElement);
			
		},
		addCompleteTask : function(task){

			let taskElement = "<div class=\"task\" taskid=\"" + task.taskId + "\">";
			taskElement += "<div class=\"task-text\">" + task.description + "</div>";
			taskElement += "<button type=\"button\" class=\"btn btn-warning incomplete-btn\"taskid=\"" + task.taskId +"\">";
			taskElement += "Incomplete" + "</button>";
			taskElement += "<button type=\"button\" class=\"btn btn-danger delete-btn\"taskid=\"" + task.taskId +"\">";
			taskElement += "Delete" + "</button>";
			
			this.completedTaskContainer.append(taskElement);
			
		}

	}


	return PageHandler;

}

function createDatabaseListeners(Database){

	const userRef = Database.ref('users');
	const taskRef = Database.ref('tasks');


	taskRef.on("value", function(){

		getIncompleteTasks(Database);
		getCompletedTasks(Database);


	});
	


}

$(document).ready(function(){

	const Database = connectDatabase();
	const PageHandler = createPageHandler();
	const User = createUser();

	addUserToDatabase(User,Database);
	createDatabaseListeners(Database);

	$(document).on('click', '.new-task-btn', function(){

		const taskDescription = PageHandler.taskDescriptionInput.val();
		PageHandler.clearTaskInput();
		const task = createTask(taskDescription, false,null);


		addTaskToDatabase(task,User.id,Database);
		
		
		


	});

	$(document).on('click', '.complete-btn', function(){

		const taskId = $(this).attr('taskid');

		const taskRef = Database.ref('tasks');

		taskRef.orderByChild("taskId").equalTo(taskId).once("value",function(snapshot){
			const key = Object.keys(snapshot.val())[0];
			
				Database.ref('tasks/'+key).update({completed:true});
			
		});

	});


	$(document).on('click', '.incomplete-btn', function(){

		const taskId = $(this).attr('taskid');

		const taskRef = Database.ref('tasks');

		taskRef.orderByChild("taskId").equalTo(taskId).once("value",function(snapshot){
			const key = Object.keys(snapshot.val())[0];
			
				Database.ref('tasks/'+key).update({completed:false});
			
		});

	});

	$(document).on('click', '.delete-btn', function(){

		const taskId = $(this).attr('taskid');

		const taskRef = Database.ref('tasks');

		taskRef.orderByChild("taskId").equalTo(taskId).once("value",function(snapshot){
			const key = Object.keys(snapshot.val())[0];

			Database.ref('tasks/'+key).remove();

		});



	});

 

  

  	
  
 		
});