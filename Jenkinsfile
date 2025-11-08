pipeline {
    agent any

    environment {
        // Identifiants Docker Hub enregistrés dans Jenkins (Manage Jenkins > Credentials)
        DOCKER_HUB_CREDENTIALS = credentials('dockerhub')

        // Images Docker à construire et pousser
        DOCKER_IMAGE_BACKEND = 'syrinebenanaya/backend:latest'
        DOCKER_IMAGE_FRONTEND = 'syrinebenanaya/frontend:latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Syrine-BEN-ANAYA/mern-notes.git'
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('backend') {
                        sh 'docker build -t ${DOCKER_IMAGE_BACKEND} .'
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    dir('frontend') {
                        sh 'docker build -t ${DOCKER_IMAGE_FRONTEND} .'
                    }
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    sh 'echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                script {
                    sh 'docker push ${DOCKER_IMAGE_BACKEND}'
                    sh 'docker push ${DOCKER_IMAGE_FRONTEND}'
                }
            }
        }

        stage('Clean up') {
            steps {
                sh 'docker rmi ${DOCKER_IMAGE_BACKEND} ${DOCKER_IMAGE_FRONTEND} || true'
            }
        }
    }

    post {
        success {
            echo '✅ Déploiement terminé avec succès !'
        }
        failure {
            echo '❌ Le pipeline a échoué.'
        }
    }
}