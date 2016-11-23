# devspace
Connect and share with other developers

## API:
### Getting Started:
All data is sent and received as JSON.

- Run 'npm install'
- Run 'npm start'.
- Go to localhost:8000.

### Errors:
Sometimes your API call will generate an error. Every response to an API call that generates an error will include an error code, the reason for the error, and an error message to help you debug your request.

| Code  | Response Text   | Description                                                                                      |
| ----- |:---------------:| :------------------------------------------------------------------------------------------------|
| 400   | Bad Request     |                                                                                                  |
| 401   | Unauthorized    | You do not have authorization to make the request.                                               |
| 403   | Forbidden       |                                                                                                  |
| 404   | Not Found       | The resource you tried to locate could not be found or does not exist.                           |
| 500   | Server Error    | An error occurred on our server. You may also get this by sending wrong data in a request.       |

## Team:
- [Michel Mitrakos](https://www.michaelmitrakos.com) - Product Owner & Software Engineer
- [Dianne Le](https://www.github.com/dfle) - Scrum Master & Software Engineer
- [David Kim](https://github.com/davidkim310) - Software Engineer

## Built With:
| Front-End         | Back-End     | Testing Frameworks  |
| ---------------- -|:------------:|:--------------------|
| Angular 2         | Node JS      | Mocha               |
| NGRX              | Express      | Chai                |
| Webpack           | Postgres     |                     |
| Angular2 Material | Sequelize    |                     |
| Ionic 2           |              |                     |

