import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

// Optional: you can pass a `lastUpdated` prop if you want to control the date from outside
// <PrivacyPage lastUpdated={new Date('2025-08-10')} />
// If not provided, it defaults to *today* so it never looks stale during development.

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);

interface PrivacyPageProps {
  lastUpdated?: Date;
}

const PrivacyPage = ({ lastUpdated }: PrivacyPageProps) => {
  const updated = lastUpdated ?? new Date();

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Meta (date first, like a blog post) */}
          <p className="text-sm tracking-wide text-gray-500 uppercase mb-3">
            Last updated {formatDate(updated)}
          </p>

          {/* Headline immediately after the date */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-8">
            Privacy Policy
          </h1>

          {/* Solid block of text — clean, single-column typography like a blog post */}
          <div className="text-gray-800 leading-7 space-y-5">
            <p>
              Your privacy is important to us. This Privacy Policy describes how we collect, use,
              and safeguard information when you use our websites, products, and services
              (collectively, the “Services”). It also explains the choices you have and how you can
              contact us about our practices.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, such as account details (name, email,
              company), and information generated through your use of the Services, including usage
              logs and technical telemetry (e.g., device identifiers, browser type, IP address,
              timestamps, and error diagnostics). For on‑premises AI deployments, your model inputs
              and outputs remain within your infrastructure by default.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">2. How We Use Information</h2>
            <p>
              We use information to operate and deliver the Services, provide customer support,
              communicate with you, improve performance and reliability, maintain security, and
              comply with legal obligations. Where required by law, we will seek your consent for
              specific uses and you may withdraw that consent at any time.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">3. Legal Bases for Processing</h2>
            <p>
              If you are in the EEA or UK, we process personal data where necessary for performance
              of a contract, compliance with legal obligations, our legitimate interests (such as
              ensuring the security and reliability of the Services), or based on your consent.
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b border-gray-300">
                      Purpose of processing
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b border-gray-300">
                      Type of Personal Data processed, depending on the processing activity
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900 border-b border-gray-300">
                      Legal basis, depending on the process activity
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200 align-top">
                      To provide, analyze, and maintain our Services
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 border-b border-gray-200 align-top">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Account Information</li>
                        <li>User Content</li>
                        <li>Communication Information</li>
                        <li>Other Information You Provide</li>
                        <li>Log Data</li>
                        <li>Usage Data</li>
                        <li>Device Information</li>
                        <li>Location Information</li>
                        <li>Cookies and Similar Technologies</li>
                      </ul>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 border-b border-gray-200 align-top">
                      Where necessary to perform a contract with you, such as processing a user's prompts to provide a response.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 text-sm text-gray-900 border-b border-gray-200 align-top">
                      To improve and develop our Services and conduct research
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 border-b border-gray-200 align-top">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Account Information</li>
                        <li>User Content</li>
                        <li>Communication Information</li>
                        <li>Other Information You Provide</li>
                        <li>Data We Receive From Other Sources</li>
                        <li>Log Data</li>
                        <li>Usage Data</li>
                        <li>Device Information</li>
                      </ul>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 border-b border-gray-200 align-top">
                      Where necessary for our legitimate interests and those of third parties and broader society, including in developing, improving, or promoting our Services, such as when we train and improve our models. See here for more information.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">4. Data Retention</h2>
            <p>
              We retain personal information only for as long as necessary to provide the Services,
              fulfill the purposes described in this Policy, or meet legal, accounting, or reporting
              requirements. Retention periods may vary depending on the nature of the data and our
              obligations.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">5. Sharing of Information</h2>
            <p>
              We do not sell your personal information. We may share information with trusted
              service providers who process it on our behalf under strict confidentiality and
              security obligations; with competent authorities when required by law; or in
              connection with a corporate transaction (such as a merger, acquisition, or asset
              sale). In such cases, we will take steps to ensure appropriate protection and provide
              notice where required.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">6. Security</h2>
            <p>
              We implement administrative, technical, and physical safeguards designed to protect
              personal information, including access controls, audit logging, encryption in transit
              and at rest (where applicable), and regular security reviews. No system is perfectly
              secure, and we encourage you to use strong passwords and enable available security
              features.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">7. International Transfers</h2>
            <p>
              Where information is transferred internationally, we rely on appropriate safeguards,
              such as standard contractual clauses or other lawful transfer mechanisms, to protect
              your data consistent with applicable laws.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">8. Your Rights</h2>
            <p>
              Subject to applicable law, you may have rights to access, correct, delete, or restrict
              processing of your personal information; to object to processing; and to data
              portability. You may also lodge a complaint with your local data protection authority.
              To exercise your rights, contact us using the details below.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">9. Children</h2>
            <p>
              The Services are not directed to children and we do not knowingly collect personal
              information from children. If you believe a child has provided us with personal
              information, please contact us so that we can take appropriate action.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">10. Changes to this Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we make material changes, we
              will notify you by updating the date at the top of this page and, when appropriate,
              providing additional notice (such as email or in‑product messaging).
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8">11. Contact</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please
              <Link to="/contact" className="text-gray-900 underline underline-offset-2"> contact us</Link>.
            </p>

            <hr className="my-10 border-gray-200" />

            <p className="text-sm text-gray-500">
              This Privacy Policy is intended to provide a clear and concise summary of our
              practices. It does not limit any rights you may have under applicable law.
            </p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
