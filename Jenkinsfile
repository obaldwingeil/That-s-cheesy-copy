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
                        sh 'cd PythonCheese nohup python3 main.py > log.txt 2>&1 &'
                    }
                }
                post {
                    always {
                        echo 'The pipeline completed'
                    }
                    success {                   
                        echo "Flask Application Up and running!!"
                    }
                    failure {
                        echo 'Build stage failed'
                        error('Stopping early…')
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
                        sh 'nohup npm start & sleep 1; echo $! > .pidfile'
                    }
                }
            }

        }
    }
}
