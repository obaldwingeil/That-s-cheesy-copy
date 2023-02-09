pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
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
            steps {
                withAWS(region:'us-west-2',credentials:'cheesy-aws-jenkins-id') {
                    s3Delete(bucket: 'cheesyawsbucket', path:'**/*')
                    s3Upload(bucket: 'cheesyawsbucket', workingDir:'build', includePathPattern:'**/*');
                }
            }
        }
    }
}
