pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/obaldwingeil/That-s-cheesy-copy', branch: 'main')
      }
    }

    stage('Log') {
      parallel {
        stage('Log') {
          steps {
            sh 'ls -la'
          }
        }

        stage('Install') {
          steps {
            sh 'npm i'
            sh '''npm i 
cd PythonCheese python3 main.py'''
          }
        }

      }
    }

    stage('Build') {
      steps {
        sh 'docker build .'
      }
    }

  }
}