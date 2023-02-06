pipeline {
    agent {
        docker {
            image 'node:8.12.0' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}
