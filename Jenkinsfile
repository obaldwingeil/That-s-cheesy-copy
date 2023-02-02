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

        stage('Run App') {
          steps {
            sh 'npm run'
          }
        }

        stage('Run Backend') {
          steps {
            sh 'cd PythonCheese python3 main.py'
          }
        }

      }
    }

  }
}