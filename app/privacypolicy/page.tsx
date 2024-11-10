import { Card, CardContent } from '@/components/ui/card';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                        <p className="mb-4">
                            At PupSpot, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                        </p>
                        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
                        <p className="mb-4">
                            We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>Personal Data: Personally identifiable information, such as your name, shipping address, email address, and telephone number.</li>
                            <li>Derivative Data: Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                        </ul>
                        <h2 className="text-2xl font-semibold mb-2">Use of Your Information</h2>
                        <p className="mb-4">
                            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>Create and manage your account.</li>
                            <li>Process your transactions and send you related information, including purchase confirmations and invoices.</li>
                            <li>Send you administrative information, such as updates, security alerts, and support messages.</li>
                            <li>Improve our website and services.</li>
                        </ul>
                        <h2 className="text-2xl font-semibold mb-2">Disclosure of Your Information</h2>
                        <p className="mb-4">
                            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                        </p>
                        <ul className="list-disc list-inside mb-4">
                            <li>By Law or to Protect Rights: If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others.</li>
                            <li>Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                        </ul>
                        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
                        <p className="mb-4">
                            If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:support@pupspot.com" className="text-blue-600">support@pupspot.com</a>
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default PrivacyPolicy;