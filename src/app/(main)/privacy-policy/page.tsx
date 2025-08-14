import Link from "next/link";

export default function page() {
  return (
    <div className="container mx-auto px-4 mt-40">
      <div className="text-lg text-news-headline font-normal space-y-8">
        <div>
          <h1 className="text-5xl text-news-headline font-news-title font-bold mb-8">
            Forbes Germany Privacy Policy
          </h1>
          <p className="text-lg font-normal text-news-headline">
            Forbes Germany understands that you value your privacy and that you
            wish to have your personal information kept secure. For these
            reasons, we place a high priority on the security of the information
            we hold. We have developed this policy to inform you about how we
            manage your personal data and maintain its integrity and security in
            accordance with the General Data Protection Regulation (GDPR), the
            Bundesdatenschutzgesetz (BDSG), and relevant industry privacy codes.
          </p>
          <p className="text-lg font-normal text-news-headline">
            We may review and update this Privacy Policy from time to time to
            take account of new laws and technologies. All personal information
            held by us will be governed by the most up-to-date version of this
            Privacy Policy posted on{" "}
            <Link
              href={`${process.env.NEXT_PUBLIC_BASE_URL}`}
              className="text-news-cta"
            >
              our website.
            </Link>
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-news-headline">
            Contact Us About Privacy
          </h2>
          <p className="text-lg text-news-headline font-normal mt-5">
            If you have any questions or would like further information about
            our privacy and information handling practices, please contact us:
            <br></br>
            <span className="font-bold">Email:</span>{" "}
            <Link href="mailto:privacy@forbes.com.de" className="text-news-cta">
              privacy@forbes.com.de
            </Link>
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-news-headline mb-3">
            What Kinds of Personal Data Are Collected and Held?
          </h2>
          <p>Personal data collected and held by us may include:</p>

          <ul className="list-disc ml-5 my-7">
            <li>Name, postal and email address</li>
            <li>Date of birth</li>
            <li>
              Contact details including telephone numbers (landline and mobile)
            </li>
            <li>Gender</li>
            <li>Occupation and employment details</li>
            <li>
              {" "}
              Images or sounds of you attending our events or enjoying our
              services and products
            </li>
          </ul>

          <p>
            We may create videos, take photographs, or make audio recordings of
            our events, services, and products, which may include you. We
            collect this information from you directly where it is reasonable
            and practicable to do so, including when you:
          </p>

          <ul className="list-disc ml-5 my-7">
            <li>
              Provide information by completing forms, disclosing data over the
              phone, registering for an event, or sharing business cards
            </li>
            <li>Visit our website</li>
            <li>Acquire goods or services from us</li>
            <li>Request information or provide feedback</li>
            <li>Fill in a form on our website</li>
            <li>Where we are required or authorized by law to do so</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-news-headline mb-3">
            How Is Your Personal Data Used?
          </h2>
          <p>
            We collect personal data to manage services or orders you place with
            us and to:
          </p>

          <ul className="list-disc ml-5 my-7">
            <li>Administer customer relationships</li>
            <li>Provide requested information, products, or services</li>
            <li>Send promotional material or service-related communications</li>
            <li>Improve our services and website performance</li>
            <li>Capture moments through photos, videos, and audio at events</li>
          </ul>

          <p>
            By interacting with us, you consent to the use of your data for the
            above purposes, including receiving marketing communications from
            us, our affiliates, and third parties via email, phone, SMS, or MMS.
          </p>

          <p className="mt-5">
            You also consent to your inclusion in photos, videos, or recordings
            made during our events or services.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-news-headline mb-3">
            International Data Transfers
          </h2>
          <p>
            Your data may be transferred, stored, or processed in countries
            including the United States, Singapore, United Kingdom, Philippines,
            and Malaysia. This may occur if we outsource functions or use
            services that operate globally.
          </p>

          <p className="mt-4">
            You consent to this international transfer and understand that data
            protection laws in these countries may differ from those in Germany
            and the EU.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-news-headline mb-3">
            Accessing and Correcting Your Personal Data
          </h2>
          <p>
            Under the GDPR, you have the right to access, correct, or request
            deletion of your personal data. To do so, please contact us using
            the email provided.
          </p>

          <p className="mt-4">
            In most cases, we will provide access, but in some legal or
            operational cases, we may deny the request, providing reasons if we
            do.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-news-headline mb-3">
            Data Security
          </h2>
          <p>
            We are committed to protecting your data through strong internal
            security procedures and the latest technology. Personal data is only
            accessible to authorized personnel, and all third-party providers we
            work with are required to maintain strict confidentiality standards.
          </p>

          <p className="mt-4">
            If your data is no longer required, we securely delete or anonymize
            it.
          </p>
          <p className="mt-4">We will not disclose your data unless:</p>

          <ul className="list-disc ml-5 mt-5">
            <li>
              It is in accordance with this Privacy Policy or your agreement
              with us
            </li>
            <li>Required or authorized by law</li>
            <li>Done with your consent</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-news-headline mb-3">
            Maintaining Data Accuracy
          </h2>
          <p>
            We aim to keep your data accurate and up to date. Please inform us
            if any information is incorrect or has changed. If we do not believe
            a correction is necessary, we will note your concerns in our
            records.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-news-headline mb-3">
            Cookies and Website Tracking
          </h2>

          <p>Cookies may be used on our website to:</p>

          <ul className="list-disc ml-5 mt-5">
            <li>Monitor traffic and analyze usage</li>
            <li>Manage advertising delivery and performance</li>
          </ul>

          <p className="mt-4">
            Cookies do not personally identify users. You can manage your cookie
            settings through your browser. Disabling cookies may affect your
            website experience.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-news-headline mb-3">
            Complaints Handling
          </h2>
          <p>
            If you believe we have breached your data privacy rights under the
            GDPR or BDSG, you may submit a complaint to:
          </p>

          <p className="mt-4">
            <span className="font-bold">Email: </span>
            <Link href="mailto:privacy@forbes.com.de" className="text-news-cta">
              privacy@forbes.com.de
            </Link>
          </p>

          <p className="mt-4">
            Alternatively, you may contact the Federal Commissioner for Data
            Protection and Freedom of Information (BfDI) or your local data
            protection authority.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-medium text-news-headline mb-3">
            Further Information
          </h2>
          <p>
            IFor more details about how we handle your personal data, please
            reach out:
          </p>

          <p className="mt-4">
            <span className="font-bold">Email: </span>
            <Link href="mailto:privacy@forbes.com.de" className="text-news-cta">
              privacy@forbes.com.de
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
