pipeline {
  agent { label 'cx-agent' }
			 parameters {
        		choice(name: 'SERVICE',
		       choices: ['pf-claims-service',
				'pf-d2c-payment-service',
				'pf-d2c-billing-service',
				'pf-business-rules-service',
				'pf-provider-directory-search-service',
				'pf-costco-member-service',
				'pf-enrollee-family-roster-service',
				'pf-usage-utilization-service',
				 'pf-enrollee-family-roster-service',
				 'pf-broker-service',
				 'pf-content-service',
				 'pf-address-cleansing-suggestion-service',
				 'pf-provider-directory-search-indexer-service',
				 'pf-eligibility-person'
				 
				] 
		       , description: 'Select Application to be tested')
				}
  stages {
    stage('Load Poperties') {
 		 steps{ 
				script{ globalTemplate.loadVariables() } 
				sh 'env | sort'
				}
  			}
    stage('Code Compile') {
      steps  {
          sh '''#Download npmrc from artifactory
wget ${ARTIFACTORY_URL}/delta-jenkins-repo/jenkins-pipeline-tools.zip\\!/jenkins-pipeline-tools/delta-code-build/nodejs/.npmrc --no-check-certificate
#Application commands
npm install

'''
      }
    }
    stage('docker-compose') {
	     environment{
	     SERVICE="${params.SERVICE}"
				    }
      steps {
        sh '''npm install protractor
export PATH=$PATH:${WORKSPACE}/node_modules/.bin
cd ${WORKSPACE}/node_modules/.bin
webdriver-manager update
cd ${WORKSPACE}

'''
      }
    }
		 stage('tests') {
		     parallel {
	  stage('MOT3 Testing'){
	  steps {
 
		  sh '''cd ${WORKSPACE}
npm run ${SERVICE}_MOT3_Primary -- --suite=${SERVICE}'''
	  }
	  }

	  stage('PIT Testing'){
	  steps {

		  sh '''cd ${WORKSPACE}
npm run ${SERVICE}_PIT_Primary -- --suite=${SERVICE}'''
	  }
	  }
	
	  stage('MOT Testing'){
	  steps {

			  sh '''cd ${WORKSPACE}
npm run ${SERVICE}_MOT_Primary -- --suite=${SERVICE}'''
	  }
	  }

	  stage('DIT Testing'){
	  steps {

	
		  sh '''cd ${WORKSPACE}
npm run ${SERVICE}_DIT_Primary -- --suite=${SERVICE}'''
	  }
	  }
	
	  stage('DEV Testing'){
	  steps {
	
	
		  sh '''cd ${WORKSPACE}
npm run ${SERVICE}_DEV -- --suite=${SERVICE}'''
	  }
	  }

	    }
	 }
    stage('Publish Reports') {
	        environment{
	     SERVICE="${params.SERVICE}"
				    }
      steps {
     //   publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: '', reportFiles: 'sauce.html', reportName: 'sauce.html', reportTitles: ''])
	publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: '', reportFiles: "${SERVICE}_MOT3_Primary.html", reportName: 'MOT3', reportTitles: ''])
        step([$class: 'SauceOnDemandTestPublisher'])
	      publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: '', reportFiles: "${SERVICE}_PIT_Primary.html", reportName: 'PIT', reportTitles: ''])
        step([$class: 'SauceOnDemandTestPublisher'])
	      publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: '', reportFiles: "${SERVICE}_MOT_Primary.html", reportName: 'MOT', reportTitles: ''])
        step([$class: 'SauceOnDemandTestPublisher'])
	      publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: '', reportFiles: "${SERVICE}_DIT_Primary.html", reportName: 'DIT', reportTitles: ''])
        step([$class: 'SauceOnDemandTestPublisher'])
	      publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: '', reportFiles: "${SERVICE}_DEV.html", reportName: 'DEV', reportTitles: ''])
        step([$class: 'SauceOnDemandTestPublisher'])
      }
    }
  }
  tools {
    nodejs 'NodeJS 10.16.0'
  }
  environment {
    PROJECT = 'cx'
    APPLICATION = 'API'
    SERVICE_TYPE = 'java'
    PATH = '/sbin:/usr/sbin:/bin:/usr/bin:/opt/jenkins_home/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarQube_Scanner/bin'
    EXECUTION = 'jenkins'
      }
}
