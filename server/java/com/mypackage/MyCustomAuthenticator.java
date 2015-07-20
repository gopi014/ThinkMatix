/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.mypackage;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.worklight.server.auth.api.AuthenticationResult;
import com.worklight.server.auth.api.AuthenticationStatus;
import com.worklight.server.auth.api.MissingConfigurationOptionException;
import com.worklight.server.auth.api.UserIdentity;
import com.worklight.server.auth.api.WorkLightAuthenticator;


public class MyCustomAuthenticator implements WorkLightAuthenticator{
	private static final Logger logger = Logger.getLogger(MyCustomAuthenticator.class.getName());

	private Map<String, Object> authenticationData = null;
	
	public void init(Map<String, String> options) throws MissingConfigurationOptionException {
		logger.info("MyCustomAuthenticator initialized");
	}

	public AuthenticationResult processRequest(HttpServletRequest request, HttpServletResponse response, boolean isAccessToProtectedResource) throws IOException,	ServletException {
		if (request.getRequestURI().contains("my_custom_auth_request_url")){
			String username = request.getParameter("username");
			String password = request.getParameter("password");
			
			if (null != username && null != password && username.length() > 0 && password.length() > 0){
				authenticationData = new HashMap<String, Object>();
				authenticationData.put("username", username);
				authenticationData.put("password", password);
				return AuthenticationResult.createFrom(AuthenticationStatus.SUCCESS);
			} else {
				response.setContentType("application/json; charset=UTF-8");
				response.setHeader("Cache-Control", "no-cache, must-revalidate");
				response.getWriter().print("{\"authStatus\":\"required\", \"errorMessage\":\"Please enter username and password\"}");
				return AuthenticationResult.createFrom(AuthenticationStatus.CLIENT_INTERACTION_REQUIRED);
			}
		} 
		
		if (!isAccessToProtectedResource) 
			return AuthenticationResult.createFrom(AuthenticationStatus.REQUEST_NOT_RECOGNIZED);
		
		response.setContentType("application/json; charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache, must-revalidate");
		response.getWriter().print("{\"authStatus\":\"required\"}");
		return AuthenticationResult.createFrom(AuthenticationStatus.CLIENT_INTERACTION_REQUIRED);
	}

	public boolean changeResponseOnSuccess(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if (request.getRequestURI().contains("my_custom_auth_request_url")){
			response.setContentType("application/json; charset=UTF-8");
			response.setHeader("Cache-Control", "no-cache, must-revalidate");
			response.getWriter().print("{\"authStatus\":\"complete\"}");
			return true;
		}
		return false;
	}

	public AuthenticationResult processAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, 
			String errorMessage) throws IOException, ServletException {

		response.setContentType("application/json; charset=UTF-8");
		response.setHeader("Cache-Control", "no-cache, must-revalidate");
		response.getWriter().print("{\"authStatus\":\"required\", \"errorMessage\":\"" + errorMessage + "\"}");
		return AuthenticationResult.createFrom(AuthenticationStatus.CLIENT_INTERACTION_REQUIRED);
	}


	public AuthenticationResult processRequestAlreadyAuthenticated(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
		return AuthenticationResult.createFrom(AuthenticationStatus.REQUEST_NOT_RECOGNIZED);
	}

	
	public Map<String, Object> getAuthenticationData() {
		logger.info("getAuthenticationData");
		return authenticationData;
	}
	
	public HttpServletRequest getRequestToProceed(HttpServletRequest request, HttpServletResponse response, UserIdentity userIdentity)	throws IOException {
		return null;
	}

	@Override
    public WorkLightAuthenticator clone() throws CloneNotSupportedException {
        MyCustomAuthenticator otherAuthenticator = (MyCustomAuthenticator) super.clone();
        otherAuthenticator.authenticationData = new HashMap<String, Object>(authenticationData);
        return otherAuthenticator;
    }

}
