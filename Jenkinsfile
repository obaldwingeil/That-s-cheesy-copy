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
                        sh 'npm start & sleep 1; echo $! > .pidfile'
                        input message: 'Finished using the web site? (Click "Proceed" to continue)'
                        sh 'kill $(cat .pidfile)'
                    }
                }
                stage('Run Backend') {
                    agent {
                        docker {
                            image 'python:3.10.7-alpine'
                            args '-p 8000:8000'
                        }
                    }
                    steps {
                        sh 'pip3 install -r requirements.txt'
                        sh 'cd PythonCheese; python main.py'
                    }
                }
            }

        }
    }
}
