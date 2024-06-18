## Safaricom Daraja API Integration (Express.js)

This repository contains a simple implementation of the Safaricom Daraja API using JavaScript with Node.js and Express.js. The Safaricom Daraja API, also known as M-Pesa API, allows developers to integrate M-Pesa mobile money transactions into their applications.

**Features**

* Integration: Implements basic functionalities to interact with Safaricom Daraja API endpoints.
* Express.js: Uses Express.js framework for building the server-side application.
* Node.js: Utilizes Node.js for server-side JavaScript runtime.
* HTTP Requests: Handles HTTP requests to Safaricom Daraja API endpoints for operations like payments and transaction status checks.
* Environment Variables: Demonstrates secure handling of sensitive information like API keys using environment variables.
* Error Handling: Includes basic error handling and response validation.
* Documentation: Provides a simple structure to understand API integration steps.

**Technologies Used**

* Node.js: JavaScript runtime environment.
* Express.js: Web application framework for Node.js.
* JavaScript: Programming language used for backend logic.
* Git: Version control system for tracking changes in the codebase.

**Installation**

To run this project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/gerismumo/node-js-daraja.git
cd your-repo
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env` file in the root directory with the following content:

```
CONSUMER_KEY=your_safaricom_api_key
CONSUMER_SECRET=your_safaricom_api_secret
PASS_KEY=your_safaricom_pass_key
SHORTCODE=your_safaricom_shortcode
PORT=5000
```

Replace `your_safaricom_api_key`, `your_safaricom_api_secret`, `your_safaricom_pass_key`, and `your_safaricom_shortcode` with your actual Safaricom Daraja API credentials.

4. **Start the server:**

```bash
npm start
```

5. **Access the application:**

You can access the application at http://localhost:5000 in your browser.

**Usage**

* Use endpoints like `/express-payment` to initiate payments.
* Handle responses from Safaricom Daraja API for transaction status and callbacks.
* Extend functionalities as needed based on the Safaricom Daraja API documentation.

**Contributing**

Contributions are welcome! Fork the repository and submit a pull request with your improvements.

**License**

This project is licensed under the MIT License.

**Contact**

For questions or support, please contact geraldmumo6@gmail.com.
