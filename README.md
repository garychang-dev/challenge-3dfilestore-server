# Challenge: 3dfilestore SERVER

### Author: Gary Chang

## How to run (Windows environment)

1. Execute `docker compose up` to setup and start the MongoDB database.
2. Execute `npm install`
3. Execute `npm run dev`
4. Make sure that my version of [3d-filestore-web](https://github.com/garychang-dev/challenge-3dfilestore-web) is running on the side.
5. Open a web browser and navigate to [http://localhost:3000/](http://localhost:3000/).
6. Have fun!

## Improvement ideas
- Create an abstraction layer for the database. This will allow us to change databases with minimal impact to the code.
- Error handling can be improved. Many of the try-catch statements wrap a lot of code. With more granularity, the frontend will be able to display more meaningful error messages to the user.
- Protect database with authentication.
- Setup configuration, so that we can setup database URL, ports, temporary file locations, etc.
- Setup this API server to work with Docker Compose, so we can start everything with a simple command line.
