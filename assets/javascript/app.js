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









$(document).ready(function(){

	const Database = connectDatabase();

 

  

  	
  
 		
});