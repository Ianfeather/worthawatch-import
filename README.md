# Worth a Watch - Import Tasks

Uses the serverless framework. You'll need to install before use:

```
npm i -g serverless
```

## Local Development

Make changes in `/lib` and tests in `/test`. To run tests:

```
npm run test

// watch mode
npm run test-w
```

## Deployment

CircleCI manages the build and deploy workflow. All branches are built.

### Branch builds

These are built and deployed to `dev`. After a successful build you'll be able to see your changes there, e.g. the function `worthawatch-import-dev-import`.

You can invoke this function locally and view the logs by running:

```
serverless --aws-profile=worthawatch invoke -f import -l
```

You can pass a custom date to the function via the cli too:

```
serverless --aws-profile=worthawatch invoke -f import -l -d '{"date": {"yesterday": "20190111", "today": "20190112}}'
```

note: you will need to have set up an AWS profile with your IAM role.

### Master builds

These are built and deployed to `prod`. After a successful build you'll be able to see your changes there, e.g. the function `worthawatch-import-prod-import`.

You can invoke this function locally and view the logs by running:

```
serverless --aws-profile=worthawatch --stage=prod invoke -f import -l
```

note: you will need to have set up an AWS profile with your IAM role.
