Contributing to LimeAuraWe love your input! We want to make contributing to LimeAura as easy and transparent as possible, whether it's:Reporting a bugDiscussing the current state of the codeSubmitting a fixProposing new featuresDevelopment ProcessWe use GitHub Flow, so all code changes happen through pull requests.Fork the repo and create your branch from main.If you've added code that should be tested, add tests.If you've changed APIs, update the documentation.Ensure the test suite passes.Make sure your code lints.Issue that pull request!Local Development SetupPrerequisites:Node.js >= 20pnpm >= 8Docker (optional, for DB/Redis)Installation:git clone [https://github.com/your-username/limeaura.git](https://github.com/your-username/limeaura.git)
cd limeaura
pnpm install
Start Environment:docker-compose up -d
Run App:pnpm dev
Code StandardsTypeScript: Strict mode is enabled. No any.Formatting: We use Prettier. Run pnpm format before committing.Linting: We use ESLint. Run pnpm lint to check for issues.Commits: Follow Conventional Commits (e.g., feat: add login page, fix: resolve auth bug).LicenseBy contributing, you agree that your contributions will be licensed under its MIT License.
