pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/obaldwingeil/That-s-cheesy-copy', branch: 'main')
      }
    }

    stage('Log') {
      steps {
        sh 'ls -la'
        sh 'npm i'
      }
    }

    stage('Build') {
      steps {
        sh 'docker build -t that-s-cheesy .'
      }
    }

  }
}
