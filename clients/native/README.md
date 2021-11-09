# Building Apps

For release, the Android app can be build like so:

```
$ docker-compose --rm native npm run --workspace=native build:android -- --type=apk
```

Doing so will require having `EXPO_TOKEN` set in `.env`.
