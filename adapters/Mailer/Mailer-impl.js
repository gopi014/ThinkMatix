function sendMail(to,cc,subject,content){
	var input = {
		    method : 'get',
		    returnedContentType : 'plain',
		    path : '/Mailer/mailer/manager/'+to+'/'+cc+'/'+subject+'/'+content
		};
	return WL.Server.invokeHttp(input);

} 