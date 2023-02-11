pipeline {
    agent any
    environment {
        CI = 'false'
        Home = '.'
        npm_config_cache = 'npm-cache'
    }
    stages {
        stage('Build') { 
            agent {
                docker {
                    image 'node:lts-bullseye-slim' 
                    args '-p 3000:3000'
                }
            }
            steps {
                sh 'npm install' 
            }
        }
        stage('Create Build Artifacts') {
            agent {
                docker {
                    image 'node:lts-bullseye-slim' 
                    args '-p 3000:3000'
                }
            }
            steps {
                sh 'npm run build'
            }
        }
        stage('Production') {
            parallel {
                stage('Front-End') {
                    agent {
                        docker {
                            image 'node:lts-bullseye-slim' 
                            args '-p 3000:3000'
                        }
                    }
                    steps {
                        withAWS(region:'us-west-2',credentials:'cheesy-aws-jenkins-id') {
                            s3Delete(bucket: 'cheesyawsbucket', path:'**/*')
                            s3Upload(bucket: 'cheesyawsbucket', workingDir:'build', includePathPattern:'**/*');
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        sh 'cd PythonCheese'
                        sh 'docker build -f PythonCheese/Dockerfile -t cheesy-backend-jenkins .'
                        sh 'docker run -p 8000:8000 cheesy-backend-jenkins'
                        input message: 'Finished using the web site? (Click "Proceed" to continue)'
                        sh 'docker stop cheesy-backend-jenkins'
                    }
                }
            }
        }
    }
}
