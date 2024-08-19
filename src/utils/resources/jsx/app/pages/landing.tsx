import { Fragment } from "hono/jsx/jsx-runtime"


const Landing = () => {
    return (
        <Fragment>
            <header class="bg-blue-600 text-white py-6">
                <div class="container mx-auto flex justify-between items-center px-4">
                    <h1 class="text-2xl font-bold">Starter API</h1>
                    <nav>
                        <a href="#features" class="px-4">Features</a>
                        <a href="#docs" class="px-4">Documentation</a>
                        <a href="#contact" class="px-4">Contact</a>
                    </nav>
                </div>
            </header>
            <main class="container mx-auto px-4 py-16">
                <section class="text-center">
                    <h2 class="text-4xl font-bold mb-6">Welcome to Starter API</h2>
                    <p class="text-lg mb-6">Your quick and easy solution to start building APIs effortlessly.</p>
                    <a href="#get-started" class="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition duration-200">Get Started</a>
                </section>
                <section id="features" class="mt-16">
                    <h3 class="text-2xl font-bold mb-4">Features</h3>
                    <ul class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <li class="bg-white shadow-lg rounded-lg p-6">
                            <h4 class="text-xl font-semibold mb-2">Fast and Lightweight</h4>
                            <p>Built with Hono and Bun, your APIs will be lightning fast.</p>
                        </li>
                        <li class="bg-white shadow-lg rounded-lg p-6">
                            <h4 class="text-xl font-semibold mb-2">Easy to Deploy</h4>
                            <p>Deploy your API in minutes with our ready-to-use setup.</p>
                        </li>
                        <li class="bg-white shadow-lg rounded-lg p-6">
                            <h4 class="text-xl font-semibold mb-2">Extensible</h4>
                            <p>Add new features and endpoints effortlessly.</p>
                        </li>
                    </ul>
                </section>
                <section id="docs" class="mt-16">
                    <h3 class="text-2xl font-bold mb-4">Documentation</h3>
                    <p>Check out our comprehensive <a href="/docs" class="text-blue-600 underline">documentation</a> to get started with our API.</p>
                </section>
                <section id="contact" class="mt-16">
                    <h3 class="text-2xl font-bold mb-4">Contact Us</h3>
                    <p>If you have any questions or need support, feel free to <a href="mailto:support@example.com" class="text-blue-600 underline">reach out to us</a>.</p>
                </section>
            </main>
            <footer class="bg-gray-200 py-6">
                <div class="container mx-auto text-center text-gray-600">
                    &copy; {new Date().getFullYear()} Starter API. All rights reserved.
                </div>
            </footer>
        </Fragment>
    )
}

export default Landing
