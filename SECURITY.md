# **Security Policy**

## **Supported Versions**

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported |  
| 1.0.x | :white\_check\_mark: |  
| \< 1.0 | :x: |

## **Reporting a Vulnerability**

We take security seriously. If you discover a security vulnerability within LimeAura, please follow these steps:

1. **Do NOT create a public GitHub issue.**  
2. Email our security team at security@limeaura.com.  
3. Include a detailed description of the vulnerability and steps to reproduce it.  
4. We will acknowledge receipt within 48 hours and provide a timeline for resolution.

## **Security Measures**

### **Authentication**

* All API endpoints are secured using JWT (JSON Web Tokens).  
* Passwords are hashed using bcrypt (or Argon2 via pgcrypto).  
* Refresh tokens are rotated securely.

### **Data Protection**

* All sensitive data is encrypted at rest in the database.  
* All data in transit is encrypted via TLS 1.3.

### **Infrastructure**

* We follow the principle of least privilege for all infrastructure access.  
* Regular security audits and dependency scanning (Snyk/Dependabot) are performed.
