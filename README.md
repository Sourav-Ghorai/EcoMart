# 🛒 **EcoMart**

EcoMart is a full-stack e-commerce website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It utilizes MongoDB for data management,  and Express.js for handling HTTP requests.EcoMart enables users to browse and purchase a wide range of products across various categories, with its user-friendly interface and secure payment processing. Experience the convenience of e-commerce with EcoMart today! 🛒🌐

### The site is currently running at [https://perfect-pear-yoke.cyclic.app/](https://perfect-pear-yoke.cyclic.app/)

## 📸 Some Clips

<img src="./public/assets/home1.png" alt="HomePage-Demo" width="30%"/> <img src="./public/assets/home2.png" alt="HomePage-Demo" width="30%"/> <br/>

<img src="./public/assets/register.png" alt="Register-Demo" width="400"/> <img src="./public/assets/login.png" alt="Login-Demo" width="400"/> <br/>

## 🚀 Features

-   🔐 User Authentication
-   📹 Video Uploading
-   🐦 Tweeting
-   👍 Likes and Comments
-   🎵 Playlists
-   📬 Subscriptions
-   📊 Dashboard
-   🏥 Health Check

## 🛠️ Technologies Used

-   **MongoDB**: A source-available cross-platform document-oriented database program.
-   **Cloudinary**: A cloud-based image and video management service.
-   **Express.js**: A web application framework for Node.js, designed for building web applications and APIs.
-   **Bcrypt**: A library to help you hash passwords.
-   **Cookie-parser**: Parse Cookie header and populate `req.cookies` with an object keyed by the cookie names.
-   **Cors**: A node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
-   **Dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`
-   **Jsonwebtoken**: An implementation of JSON Web Tokens.
-   **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
-   **Mongoose-aggregate-paginate-v2**: A mongoose plugin to paginate aggregation results.
-   **Multer**: A node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files.

## 🏁 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

Before you begin, ensure you have met the following requirements:

-   🖥️ You have a recent version of **Node.js** installed. If not, you can download it from [here](https://nodejs.org/)
-   🧰 You have a package manager like **npm** (comes with Node.js) or **yarn** installed.
-   🛠️ You have **Git** installed. If not, you can download it from [here](https://git-scm.com/downloads)

## 🛠️ Installation & Set Up

1. 🔽 Clone the repository:

    ```bash
    git clone https://github.com/AnikAdhikari7/WeTube.git
    ```

2. 📂 Navigate into the directory:

    ```bash
    cd WeTube
    ```

3. 🌐 Install the dependencies:

    ```bash
    npm install
    ```

4. 🌿 Create a `.env` file and populate it with the necessary API keys and secrets:

    ```bash
    cp .env.example .env
    ```

    Open `.env` and replace the placeholders with your actual data.

5. 🚀 Run the application in development mode:
    ```bash
    npm run dev
    ```

## 🚀 Running the Application

After installing the dependencies, you can run the application using the following scripts defined in the `package.json` file:

-   To run the application in development mode, use:
    ```bash
    npm run dev
    ```
-   To start the application normally, use:
    ```bash
    npm start
    ```

## 🐳 Docker Usage

You can also run this application as a Docker container:

1. Pull the Docker image from Docker Hub:

    ```bash
    docker pull anikadhikari/wetube:latest

    ```

2. Run the Docker container:
    ```bash
    docker run --rm -d -p 8080:8080 --env-file ./.env --name <wetube-docker-container> anikadhikari/wetube:latest
    ```
    Replace `<wetube-docker-container>` with your desired container name. <br/>
    Replace `8080` with your desired port number.

-   To to know more about the docker image, visit the [Docker Hub](https://hub.docker.com/r/anikadhikari/wetube)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 🎉 Acknowledgments

-   Thanks to all contributors who have helped with pull requests and issues.

-   Thanks to all the developers who have created the libraries and tools used in this project.

-   Gratitude for the following resources that guided the development process:
    -   [Tutorial by Chai aur Javascript Backend](https://youtube.com/playlist?list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&si=yOimvgK66q6PCVyn) -> [GitHub Repo](https://github.com/hiteshchoudhary/chai-backend) for explaining how to set up a Node.js/Express.js server that too production grade level.
    -   [@hiteshchoudhary](https://github.com/hiteshchoudhary) for their helpful code snippets and solutions to issues.
