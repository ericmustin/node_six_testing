#### Setup

- `docker build -t node_six_testing .`

- `docker run -p 3000:3000 --name=node_six_testing --detach node_six_testing:latest`

#### Testing

- `curl -G localhost:3000?name=testname`

- `docker exec -it node_six_testing /bin/bash`

(From inside docker container)
```
root@937c15076cd0:/usr/src/app# cat testLog 

{"name":"testLog","hostname":"937c15076cd0","pid":17,"level":30,"event":"\n  Hello \"Cecile\", \n  thanks for shopping today! You order total today was: $86. \n  You saved 5 dollars. Come back real soon!\n  \n\n  ","msg":"Received incoming request ...test","time":"2020-04-10T10:26:29.084Z","v":0,"dd":{"trace_id":"2788779339466193134","span_id":"6572389213715558827"}}
```

From cli
- `docker stop node_six_testing`