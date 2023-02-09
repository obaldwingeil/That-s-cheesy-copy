pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'false'
        Home = '.'
        npm_config_cache = 'npm-cache'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Create Build Artifacts') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Production') {
            parallel {
                stage('Front-End') {
                    steps {
                        withAWS(region:'us-west-2',credentials:'cheesy-aws-jenkins-id') {
                            s3Delete(bucket: 'cheesyawsbucket', path:'**/*')
                            s3Upload(bucket: 'cheesyawsbucket', workingDir:'build', includePathPattern:'**/*');
                        }
                    }
                }
                stage('Backend') {
                    agent {
                        docker {
                            image 'python:3.10.7-alpine'
                            args '-p 8000:8000'
                        }
                    }
                    steps {
                        sh 'cd PythonCheese python3 main.py &'
                        input message: 'Finished using the server? (Click "Proceed" to continue)'
                    }
                }
            }
        }
    }
}
