pipeline {
   agent none
   environment {
        ENV = "$params.ENV"
        API_PORT = "$params.API_PORT"
        NODE = "Build-server"
        DOCKER_REGISTRY = "$params.DOCKER_REGISTRY"
        DOCKER_REGISTRY_USER = "$params.DOCKER_REGISTRY_USER"
        DOCKER_REGISTRY_PASS = "$params.DOCKER_REGISTRY_PASS"

        NODEJS_APP = "nodejs-app"
        DOCKER_HUB_REPO = "cantran/labs-devops"
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
            sh "rm -f -r $TAG && mkdir -p $TAG"
            // sh "cd $TAG"
            // sh script:'''
            //     #!/bin/bash
            //     echo "This is start $(pwd)"
            //     rm -f -r $TAG && mkdir -p $TAG && cd $TAG
            //     echo "This is end $(pwd)"


            // '''
            // https://docs.docker.com/engine/reference/commandline/login/#credentials-store
            sh "echo '$DOCKER_REGISTRY_PASS' | docker login --username $DOCKER_REGISTRY_USER --password-stdin"
            // customWorkspace "/home/cantv/work/Jenkins/workspaces/server_2/$ENV/"
            dir("$TAG") {
                sh "git clone https://github.com/can-tran/labs-devops.git"
                dir("labs-devops/nodejs-app") {
                    sh "docker build . -t nodejs-app-$ENV:latest --build-arg BUILD_ENV=$ENV -f Dockerfile"

                    // tag docker image
                    sh "docker tag nodejs-app-$ENV:latest $DOCKER_HUB_REPO:$ENV-$NODEJS_APP-$TAG"

                    //push docker image to docker hub
                    sh "docker push $DOCKER_HUB_REPO:$ENV-$NODEJS_APP-$TAG"

                    // remove docker image to reduce space on build server
                    sh "docker rmi -f $DOCKER_HUB_REPO:$ENV-$NODEJS_APP-$TAG"
                }
            }
            // script{
            //     if (params.DOCKER_REGISTRY.isEmpty()) {
            //         echo '$DOCKER_REGISTRY_PASS' | docker login --username $DOCKER_REGISTRY_USER --password-stdin
            //     } else {
            //         echo '$DOCKER_REGISTRY_PASS' | docker login $DOCKER_REGISTRY --username $DOCKER_REGISTRY_USER --password-stdin
            //     }
            // }

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
                // sh "sed -i 's/{tag}/$TAG/g' /home/cantv/work/Jenkins/workspaces/server_3/$ENV/docker-compose.yaml"
                // sh "docker compose up -d"

                sh "rm -f -r $TAG && mkdir -p $TAG"

                // https://docs.docker.com/engine/reference/commandline/login/#credentials-store
                sh "echo '$DOCKER_REGISTRY_PASS' | docker login --username $DOCKER_REGISTRY_USER --password-stdin"
                // customWorkspace "/home/cantv/work/Jenkins/workspaces/server_2/$ENV/"
                dir("$TAG") {
                    sh "git clone https://github.com/can-tran/labs-devops.git"
                    dir("labs-devops") {
                        sh "sed -i 's/{tag}/$ENV-$NODEJS_APP-$TAG/g' docker-compose.yaml"
                        sh "sed -i 's/{ENV}/$ENV/g' docker-compose.yaml"
                        sh "sed -i 's/{API_PORT}/$API_PORT/g' docker-compose.yaml"
                        sh "cat docker-compose.yaml"
                        sh "docker compose up -d"
                    }
                }
            }
       }
   }
    
}
