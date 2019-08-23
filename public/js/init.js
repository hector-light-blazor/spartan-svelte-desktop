
async function  initDB() {
   
    if(client_status) {

		// DO DNS LOOK UP local network connect to db
		// if not fail over to API http request 
		await dns.lookup('911.local', {all: true}, (err, addresses) =>
				{client_status = (addresses.length > 0) ? true : false;
				
								if(client_status) {
						try { //Try to connect if fail then tell the app to switch
							client = new Client(db) //Connect to database...
                            console.log("SQL Local");
                            client.connect(); //await to Connect to the database...
						} catch (error) {
							client_status = false;
						}
					}	
				}
			);
       

      
    }
    
}

initDB();

window.onbeforeunload = function(){
    // Do something
    if(client_status){
        client.end(); //Close the connection...
    }
 }