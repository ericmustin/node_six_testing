#### Setup

- From directory root

```console
docker build -t node_six_testing .
```

- Next, create a docker network

```console
docker network create nodetesting
```

- Then, start the datadog container agent. Be sure to replace the below <YOUR_API_KEY> with your Datadog API Key. You'll notice we have the datadog-agent running on the network we just created

```console
# Datadog Agent
docker run -d --name datadog-agent \
              --network nodetesting \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<YOUR_API_KEY> \
              -e DD_APM_ENABLED=true \
              -e DD_APM_NON_LOCAL_TRAFFIC=true \
              -e DD_LOGS_ENABLED=true \
              -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
              -e DD_AC_EXCLUDE="name:datadog-agent" \
              datadog/agent:latest
```

- Finally, start your application container on the same network as the agent is running on. In the Dockerfile for this application you'll notice we've enabled pointed the Node Tracer to send traces to our agent running in the container `datadog-agent` (ENV DD_AGENT_HOST=datadog-agent) 

```console
docker run -d -p 3000:3000 --name=node_six_testing -v $(pwd)/app/:/usr/src/app/app --network nodetesting node_six_testing:latest
```

- changes made to your `/app` folder will be mounted onto the container and the app will be automatically restarted

#### Testing

- `curl -G localhost:3000?name=testname`

- `curl -G localhost:3000/one?name=testname`

- `curl -G localhost:3000/two?name=testname`

- `curl -G localhost:3000/three?name=testname`

- `docker exec -it node_six_testing /bin/bash`

- To view logs

```console
$ npm install

$ `docker logs node_six_testing | ./node_modules/.bin/bunyan`
```

-  cleanup
  - `docker stop node_six_testing`
  - `docker rm node_six_testing`
  - `docker stop datadog-agent`
  - `docker rm datadog-agent`
  - `docker network rm nodetesting`