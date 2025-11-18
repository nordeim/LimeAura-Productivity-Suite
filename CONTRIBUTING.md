# **Contributing to LimeAura**

We love your input\! We want to make contributing to LimeAura as easy and transparent as possible, whether it's:

* Reporting a bug  
* Discussing the current state of the code  
* Submitting a fix  
* Proposing new features

## **Development Process**

We use **GitHub Flow**, so all code changes happen through pull requests.

1. Fork the repo and create your branch from main.  
2. If you've added code that should be tested, add tests.  
3. If you've changed APIs, update the documentation.  
4. Ensure the test suite passes.  
5. Make sure your code lints.  
6. Issue that pull request\!

## **Local Development Setup**

1. **Prerequisites:**  
   * Node.js \>= 20  
   * pnpm \>= 8  
   * Docker (optional, for DB/Redis)  
2. **Installation:**  
   git clone \[https://github.com/your-username/limeaura.git\](https://github.com/your-username/limeaura.git)  
   cd limeaura  
   pnpm install

3. **Start Environment:**  
   docker-compose up \-d

4. **Run App:**  
   pnpm dev

## **Code Standards**

* **TypeScript:** Strict mode is enabled. No any.  
* **Formatting:** We use Prettier. Run pnpm format before committing.  
* **Linting:** We use ESLint. Run pnpm lint to check for issues.  
* **Commits:** Follow Conventional Commits (e.g., feat: add login page, fix: resolve auth bug).

## **License**

By contributing, you agree that your contributions will be licensed under its MIT License.
