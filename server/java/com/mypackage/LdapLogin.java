package com.mypackage;

import swat.ReturnCode;
import swat.cwa;

public class LdapLogin {
	private static final String LDAP_SERVER = "bluepages.ibm.com";
	private static final int LDAP_PORT = 389;
	
	public LdapLogin(){}
	
	public boolean loginUser(String user, String pass) {
		if (validateUser(user,pass)) {
			return true;
		}
		return false;
	}
	
	private boolean validateUser(String user, String pass) {
		boolean ret = false;
		ReturnCode rc = cwa.authenticate("ldap://" + LDAP_SERVER + ":" + LDAP_PORT, user, pass);
		
		if (rc.getCode() == cwa.RC_SUCCESS) {
			ret = true;
		}
		return ret;
	}
}
