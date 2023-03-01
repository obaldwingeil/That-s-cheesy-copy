pipeline {
    agent {
        node { 
            label 'generic && (64GB || 16GB || 4GB)'
        } 
    }

    parameters {
        choice(name: 'BUCKET', choices: [via-umt-dev, via-umt-qa, via-umt-stage, via-umt-prod, cheesyawsbucket], description: "Target Bucket")
        string(name: 'AWS_ACCESS_KEY_ID', defaultValue: '')
        string(name: 'AWS_SECRET_ACCESS_KEY', defaultValue: '')
    }

    stages {
        stage('Checkout Scm') {
            steps {
                git(credentialsId: 'build-viacom-com-sa-github-token', url: 'https://github.com/obaldwingeil/That-s-cheesy-copy')
            }
        }

        stage('Copy Files to S3'){
            steps {
                sh '''
                    aws s3 sync s3://$BUCKET .
                '''
            }
        }
    }
}
