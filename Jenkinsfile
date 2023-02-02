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