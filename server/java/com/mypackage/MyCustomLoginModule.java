/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

package com.mypackage;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.worklight.server.auth.api.MissingConfigurationOptionException;
import com.worklight.server.auth.api.UserIdentity;
import com.worklight.server.auth.api.WorkLightAuthLoginModule;

public class MyCustomLoginModule implements WorkLightAuthLoginModule {

	private String USERNAME;
	private String PASSWORD;
	
	public void init(Map<String, String> options) throws MissingConfigurationOptionException {
	}

	public boolean login(Map<String, Object> authenticationData) {
		USERNAME = (String) authenticationData.get("username");
		PASSWORD = (String) authenticationData.get("password");

// New Code --------------------------
	LdapLogin login = new LdapLogin();
		if (login.loginUser(USERNAME, PASSWORD)) {
			return true;
		} else {
			throw new RuntimeException("Invalid Credentials");
		}
	}
// End New Code -----------------------		
	
	
// Original code ********************
/*		if (USERNAME.equals("wluser") && PASSWORD.equals("12345")) 
			return true;
		else 
			throw new RuntimeException("Invalid credentials");
	}
	**********************************
*/
	
	public UserIdentity createIdentity(String loginModule) {
		HashMap<String, Object> customAttributes = new HashMap<String, Object>();
		customAttributes.put("AuthenticationDate", new Date());
		
		UserIdentity identity = new UserIdentity(loginModule, USERNAME, null, null, customAttributes, PASSWORD);
		return identity;
	}
	


	public void logout() {
		USERNAME = null;
		PASSWORD = null;
	}

	public void abort() {
		USERNAME = null;
		PASSWORD = null;
	}

	@Override
    public MyCustomLoginModule clone() throws CloneNotSupportedException {
        return (MyCustomLoginModule) super.clone();
    }

}
