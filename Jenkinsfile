pipeline {
    agent any
    stages {
        stage('Build') { 
                agent {
                    docker {
                        image 'node:lts-bullseye-slim' 
                        args '-p 3000:3000'
                    }
                }
                environment {
                    CI = 'false npm run build'
                }
            steps {
                sh 'npm install' 
            }
        }
        stage('Run App') {
            parallel {
                stage('Run Backend') {
                    agent {
                        docker {
                            image 'python:3.10.7-alpine'
                            args '-p 8000:8000'
                        }
                    }
                    steps {
                        sh 'cd PythonCheese python3 main.py'
                    }
                }
                stage('Run Front-End') {
                    agent {
                        docker {
                            image 'node:lts-bullseye-slim' 
                            args '-p 3000:3000'
                        }
                    }
                    environment {
                        CI = 'false npm run build'
                    }
                    steps {
                        sh 'forever start index.js'
                    }
                }
            }

        }
    }
}
