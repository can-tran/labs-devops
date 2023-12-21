pipeline {
   agent none
   environment {
        ENV = "dev"
        NODE = "Build-server"
        DOCKER_REGISTRY = "$params.DOCKER_REGISTRY"
        DOCKER_REGISTRY_USER = "$params.DOCKER_REGISTRY_USER"
        DOCKER_REGISTRY_PASS = "$params.DOCKER_REGISTRY_PASS"
    }

   stages {
    stage('Build Image') {
        agent {
            node {
                label "Build-server"
                customWorkspace "/home/cantv/work/Jenkins/workspaces/server_2/$ENV/"
                }
            }
        environment {
            TAG = sh(returnStdout: true, script: "git rev-parse -short=10 HEAD | tail -n +2").trim()
        }
         steps {
            sh "git clone https://github.com/can-tran/labs-devops.git"

            sh "cd labs-devops"

            sh "docker build nodejs-app/. -t nodejs-app-$ENV:latest --build-arg BUILD_ENV=$ENV -f nodejs-app/Dockerfile"

            // sh "cat docker.txt | docker login -u manhhoangseta --password-stdin"
            echo "$DOCKER_REGISTRY_PASS" | docker login $DOCKER_REGISTRY --username $DOCKER_REGISTRY_USER --password-stdin

            // tag docker image
            sh "docker tag nodejs-app-$ENV:latest [dockerhub-repo]:$TAG"

            //push docker image to docker hub
            sh "docker push [dockerhub-repo]:$TAG"

	        // remove docker image to reduce space on build server
            sh "docker rmi -f [dockerhub-repo]:$TAG"

           }
         
       }
	  stage ("Deploy") {
	    agent {
        node {
            label "Target-Server-$ENV"
                customWorkspace "/home/cantv/work/Jenkins/workspaces/server_3/$ENV/"
            }
        }
        environment {
            TAG = sh(returnStdout: true, script: "git rev-parse -short=10 HEAD | tail -n +2").trim()
        }
	steps {
            sh "sed -i 's/{tag}/$TAG/g' /home/cantv/work/Jenkins/workspaces/server_3/$ENV/docker-compose.yaml"
            sh "docker compose up -d"
        }
       }
   }
    
}
