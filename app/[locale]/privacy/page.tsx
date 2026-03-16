import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/privacy', {
    title: '隐私政策',
    description: '微算隐私政策：了解我们如何收集、使用、存储和保护您的个人信息。符合GDPR和中国个人信息保护法(PIPL)标准。',
    keywords: '隐私政策,数据保护,个人信息,GDPR,PIPL,数据安全',
  }, {
    title: 'Privacy Policy',
    description: 'Weisuàn Privacy Policy: Learn how we collect, use, store and protect your personal information. Compliant with GDPR, CCPA, and China PIPL standards.',
    keywords: 'privacy policy,data protection,personal information,GDPR,CCPA,PIPL,data security',
  });
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-semibold text-weisuan-black">{children}</h2>;
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="text-base font-medium text-weisuan-black">{title}</h3>
      <div className="mt-2 space-y-3 text-sm text-weisuan-gray leading-relaxed">{children}</div>
    </div>
  );
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  if (isZh) {
    return (
      <div>
        <section className="bg-weisuan-black text-white py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>法律</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-5xl">隐私政策</h1>
            <p className="mt-4 text-sm text-white-60">生效日期：2025年1月1日 | 最后更新：2026年3月14日</p>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm text-weisuan-gray leading-relaxed">
            微算团队（以下简称"我们"）深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。本隐私政策适用于您通过 microai.icu 网站（以下简称"本网站"）及相关服务与我们进行交互时所涉及的个人信息处理活动。
          </p>

          <SectionTitle>一、我们收集的信息</SectionTitle>
          <SubSection title="1.1 您主动提供的信息">
            <p>当您使用我们的服务时，我们可能收集以下信息：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>联系信息：姓名、电子邮件地址、电话号码、公司名称</li>
              <li>咨询与反馈：您通过联系表单、反馈表单提交的内容</li>
              <li>账户信息：注册账号时提供的用户名和电子邮件</li>
            </ul>
          </SubSection>
          <SubSection title="1.2 自动收集的信息">
            <p>当您访问本网站时，我们可能自动收集：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>设备信息：浏览器类型、操作系统、屏幕分辨率</li>
              <li>日志信息：IP地址、访问时间、页面浏览记录、引荐来源</li>
              <li>Cookie与类似技术：用于改善网站体验和分析流量</li>
            </ul>
          </SubSection>

          <SectionTitle>二、信息使用目的</SectionTitle>
          <div className="mt-4 space-y-3 text-sm text-weisuan-gray leading-relaxed">
            <p>我们将收集的信息用于以下目的：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>响应您的咨询和服务请求</li>
              <li>提供、维护和改进我们的服务</li>
              <li>发送与我们产品和服务相关的通知（您可随时退订）</li>
              <li>进行网站使用分析以改善用户体验</li>
              <li>遵守法律法规要求</li>
              <li>防止欺诈和保障网站安全</li>
            </ul>
          </div>

          <SectionTitle>三、Cookie 与追踪技术</SectionTitle>
          <div className="mt-4 space-y-3 text-sm text-weisuan-gray leading-relaxed">
            <p>本网站使用以下追踪技术：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>百度统计</strong>：用于分析中国地区的网站流量和用户行为</li>
              <li><strong>Google Analytics</strong>：用于分析全球网站流量和用户行为</li>
              <li><strong>必要 Cookie</strong>：用于维护会话状态和网站基本功能</li>
            </ul>
            <p>您可以通过浏览器设置拒绝或删除 Cookie。请注意，禁用 Cookie 可能会影响网站的部分功能。</p>
          </div>

          <SectionTitle>四、信息共享与披露</SectionTitle>
          <div className="mt-4 space-y-3 text-sm text-weisuan-gray leading-relaxed">
            <p>我们不会出售您的个人信息。我们仅在以下情况下共享您的信息：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>服务提供商</strong>：为运营网站所必需（如 Netlify 托管、Neon 数据库、SendGrid 邮件服务）</li>
              <li><strong>法律要求</strong>：为遵守法律法规、执行法律程序或响应政府机关的要求</li>
              <li><strong>安全保障</strong>：为保护我们、我们的用户或公众的权利、财产或安全</li>
              <li><strong>经您同意</strong>：在获得您的明确同意后与第三方共享</li>
            </ul>
          </div>

          <SectionTitle>五、数据安全</SectionTitle>
          <div className="mt-4 space-y-3 text-sm text-weisuan-gray leading-relaxed">
            <p>我们采取业界标准的安全措施保护您的个人信息，包括：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>SSL/TLS 加密传输</li>
              <li>访问控制和权限管理</li>
              <li>数据备份和灾难恢复</li>
              <li>定期安全审计</li>
            </ul>
            <p>尽管我们尽最大努力保护您的信息安全，但任何通过互联网的数据传输都无法保证100%的安全。</p>
          </div>

          <SectionTitle>六、数据保留</SectionTitle>
          <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
            <p>我们将在实现收集目的所必需的期限内保留您的个人信息，除非法律要求或允许更长的保留期。当信息不再需要时，我们会安全地删除或匿名化处理。</p>
          </div>

          <SectionTitle>七、您的权利</SectionTitle>
          <div className="mt-4 space-y-3 text-sm text-weisuan-gray leading-relaxed">
            <p>根据中国《个人信息保护法》及相关法规，您享有以下权利：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>知情权和决定权：了解并决定个人信息的处理方式</li>
              <li>查阅和复制权：查阅和复制您的个人信息</li>
              <li>更正权：要求更正不准确的个人信息</li>
              <li>删除权：在特定情况下要求删除您的个人信息</li>
              <li>撤回同意权：撤回您此前给予的同意</li>
              <li>注销账户权：注销您的账户</li>
            </ul>
            <p>如需行使上述权利，请通过本页底部的联系方式与我们联系。</p>
          </div>

          <SectionTitle>八、未成年人保护</SectionTitle>
          <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
            <p>我们的服务面向企业用户，不面向16岁以下的未成年人。我们不会故意收集未成年人的个人信息。如果我们发现意外收集了未成年人的信息，将立即采取措施删除。</p>
          </div>

          <SectionTitle>九、国际数据传输</SectionTitle>
          <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
            <p>本网站的数据主要存储在由 Netlify 和 Neon 提供的基础设施上。如果您从欧洲经济区 (EEA) 或其他地区访问本网站，您的信息可能会被传输到中国或其他国家。我们会确保此类传输符合适用的数据保护法律。</p>
          </div>

          <SectionTitle>十、隐私政策的变更</SectionTitle>
          <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
            <p>我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并注明生效日期。建议您定期查看本页面以了解最新的隐私保护措施。重大变更时，我们会在网站上发布显著通知。</p>
          </div>

          <SectionTitle>十一、联系我们</SectionTitle>
          <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
            <p>如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：</p>
            <div className="mt-4 rounded-2xl bg-weisuan-light p-6">
              <p className="font-medium text-weisuan-black">微算团队</p>
              <p className="mt-1">地址：北京市海淀区</p>
              <p>电子邮件：13426086861@139.com</p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-black-10">
            <Link href="/terms" className="text-sm text-weisuan-accent hover:underline">查看使用条款 →</Link>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-weisuan-black text-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Legal</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-white-60">Effective Date: January 1, 2025 | Last Updated: March 14, 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm text-weisuan-gray leading-relaxed">
          Weisuàn Team (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, share, and protect your information when you visit our website at microai.icu (the &quot;Website&quot;) or interact with our services. This policy is designed to comply with the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and the People&apos;s Republic of China Personal Information Protection Law (PIPL).
        </p>

        <SectionTitle>1. Information We Collect</SectionTitle>
        <SubSection title="1.1 Information You Provide Directly">
          <p>We may collect the following personal information when you voluntarily provide it:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Contact Information:</strong> Name, email address, phone number, company name, and job title when you fill out contact or inquiry forms</li>
            <li><strong>Feedback and Communications:</strong> Content you submit through our feedback forms, contact forms, or chatbot interactions</li>
            <li><strong>Account Information:</strong> Username and email address when you create an account through Netlify Identity</li>
          </ul>
        </SubSection>
        <SubSection title="1.2 Information Collected Automatically">
          <p>When you visit our Website, we may automatically collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Device Information:</strong> Browser type and version, operating system, screen resolution, device type</li>
            <li><strong>Log Data:</strong> IP address, access timestamps, pages viewed, referring URLs, click-stream data</li>
            <li><strong>Usage Data:</strong> Interaction patterns, session duration, features accessed</li>
            <li><strong>Cookies and Similar Technologies:</strong> As described in Section 3 below</li>
          </ul>
        </SubSection>
        <SubSection title="1.3 Information We Do Not Collect">
          <p>We do not collect sensitive personal data such as racial or ethnic origin, political opinions, religious beliefs, genetic or biometric data, health information, or sexual orientation.</p>
        </SubSection>

        <SectionTitle>2. How We Use Your Information</SectionTitle>
        <div className="mt-4 space-y-3 text-sm text-weisuan-gray leading-relaxed">
          <p>We use the collected information for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Service Delivery:</strong> To respond to your inquiries, provide customer support, and process your requests</li>
            <li><strong>Website Improvement:</strong> To analyze usage patterns and improve our Website&apos;s functionality and user experience</li>
            <li><strong>Communications:</strong> To send you relevant information about our products and services (with your consent, where required by law)</li>
            <li><strong>Security:</strong> To detect, prevent, and address fraud, unauthorized access, and other illegal activities</li>
            <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
            <li><strong>Analytics:</strong> To understand how our Website is used and to generate aggregated, non-identifying statistics</li>
          </ul>
          <p><strong>Legal Basis for Processing (GDPR):</strong> We process your personal data based on: (a) your consent, (b) the performance of a contract or pre-contractual measures, (c) our legitimate interests (such as improving our services and ensuring security), or (d) compliance with a legal obligation.</p>
        </div>

        <SectionTitle>3. Cookies and Tracking Technologies</SectionTitle>
        <div className="mt-4 space-y-3 text-sm text-weisuan-gray leading-relaxed">
          <p>Our Website uses the following tracking technologies:</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black-10">
                  <th className="py-3 pr-4 font-medium text-weisuan-black">Technology</th>
                  <th className="py-3 pr-4 font-medium text-weisuan-black">Provider</th>
                  <th className="py-3 font-medium text-weisuan-black">Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-black-10"><td className="py-3 pr-4">Analytics</td><td className="py-3 pr-4">Google Analytics</td><td className="py-3">Website traffic analysis and user behavior insights</td></tr>
                <tr className="border-b border-black-10"><td className="py-3 pr-4">Analytics</td><td className="py-3 pr-4">Baidu Analytics</td><td className="py-3">Website traffic analysis for visitors from China</td></tr>
                <tr className="border-b border-black-10"><td className="py-3 pr-4">Essential</td><td className="py-3 pr-4">Netlify</td><td className="py-3">Session management, authentication, and hosting</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>Managing Cookies:</strong> You can control cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Please note that disabling cookies may affect the functionality of the Website. You can also opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-weisuan-accent underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>
        </div>

        <SectionTitle>4. How We Share Your Information</SectionTitle>
        <div className="mt-4 space-y-3 text-sm text-weisuan-gray leading-relaxed">
          <p><strong>We do not sell your personal information.</strong> We may share your information only in the following limited circumstances:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating the Website (e.g., Netlify for hosting, Neon for database services, SendGrid for email delivery). These providers are contractually bound to protect your data.</li>
            <li><strong>Legal Requirements:</strong> When required by law, regulation, legal process, or governmental request</li>
            <li><strong>Protection of Rights:</strong> To protect our rights, privacy, safety, or property, or that of our users or the public</li>
            <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of assets, your information may be transferred as part of that transaction</li>
            <li><strong>With Your Consent:</strong> When you have given explicit consent for a specific sharing purpose</li>
          </ul>
        </div>

        <SectionTitle>5. Data Security</SectionTitle>
        <div className="mt-4 space-y-3 text-sm text-weisuan-gray leading-relaxed">
          <p>We implement industry-standard security measures to protect your personal information, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>SSL/TLS encryption for all data in transit</li>
            <li>Access controls and authentication mechanisms</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Data backup and disaster recovery procedures</li>
            <li>Employee training on data protection best practices</li>
          </ul>
          <p>While we strive to protect your personal information, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.</p>
        </div>

        <SectionTitle>6. Data Retention</SectionTitle>
        <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
          <p>We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, unless a longer retention period is required or permitted by law. When data is no longer needed, we will securely delete or anonymize it. Specific retention periods include:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Contact form submissions: 24 months from the date of submission</li>
            <li>User account data: Duration of the account plus 30 days after deletion</li>
            <li>Analytics data: As governed by the respective analytics provider&apos;s retention policies</li>
          </ul>
        </div>

        <SectionTitle>7. Your Rights</SectionTitle>
        <SubSection title="7.1 Rights Under GDPR (European Economic Area)">
          <p>If you are located in the EEA, you have the following rights:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data under certain conditions</li>
            <li><strong>Right to Restriction:</strong> Request restriction of processing under certain conditions</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
            <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
          </ul>
        </SubSection>
        <SubSection title="7.2 Rights Under CCPA (California Residents)">
          <p>If you are a California resident, you have the following rights:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Right to Know:</strong> Request disclosure of the categories and specific pieces of personal information we have collected</li>
            <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
            <li><strong>Right to Opt-Out:</strong> We do not sell personal information, so this right does not apply</li>
            <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights</li>
          </ul>
        </SubSection>
        <SubSection title="7.3 Rights Under China PIPL">
          <p>Under the Personal Information Protection Law of the People&apos;s Republic of China, you have similar rights including the right to know, decide, access, copy, correct, delete, and withdraw consent regarding your personal information.</p>
        </SubSection>
        <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
          <p>To exercise any of these rights, please contact us using the details in Section 11 below. We will respond to your request within 30 days (or within the time frame required by applicable law).</p>
        </div>

        <SectionTitle>8. Children&apos;s Privacy</SectionTitle>
        <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
          <p>Our services are designed for business use and are not directed to children under the age of 16 (or the applicable age of consent in your jurisdiction). We do not knowingly collect personal information from children. If we learn that we have collected personal data from a child without parental consent, we will take steps to delete that information promptly.</p>
        </div>

        <SectionTitle>9. International Data Transfers</SectionTitle>
        <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
          <p>Our Website data is primarily stored on infrastructure provided by Netlify and Neon, which may be located outside your country of residence. If you access our Website from the European Economic Area, the United Kingdom, or other regions with data protection laws, your personal data may be transferred to and processed in China or other countries. We ensure that such transfers are conducted in compliance with applicable data protection laws, including the use of standard contractual clauses or other appropriate safeguards where required.</p>
        </div>

        <SectionTitle>10. Changes to This Privacy Policy</SectionTitle>
        <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
          <p>We may update this Privacy Policy from time to time. The updated policy will be posted on this page with a revised &quot;Last Updated&quot; date. We encourage you to review this page periodically. For material changes, we will provide a prominent notice on our Website. Your continued use of the Website after any changes constitutes acceptance of the updated policy.</p>
        </div>

        <SectionTitle>11. Contact Us</SectionTitle>
        <div className="mt-4 text-sm text-weisuan-gray leading-relaxed">
          <p>If you have any questions about this Privacy Policy, wish to exercise your data protection rights, or have concerns about our privacy practices, please contact us:</p>
          <div className="mt-4 rounded-2xl bg-weisuan-light p-6">
            <p className="font-medium text-weisuan-black">Weisuàn Team</p>
            <p className="mt-1">Address: Haidian District, Beijing, China</p>
            <p>Email: 13426086861@139.com</p>
          </div>
          <p className="mt-4">For EEA residents, you also have the right to lodge a complaint with your local data protection supervisory authority.</p>
        </div>

        <div className="mt-12 pt-8 border-t border-black-10">
          <Link href="/terms" className="text-sm text-weisuan-accent hover:underline">View Terms of Service →</Link>
        </div>
      </article>
    </div>
  );
}
