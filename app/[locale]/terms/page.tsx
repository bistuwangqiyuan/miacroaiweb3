import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, '/terms', {
    title: '使用条款',
    description: '微算网站使用条款和服务条件。包含知识产权、责任限制、适用法律等完整条款。',
    keywords: '使用条款,服务条款,服务条件,法律,知识产权',
  }, {
    title: 'Terms of Service',
    description: 'Weisuàn website terms of service and conditions of use. Including intellectual property, limitation of liability, governing law, and complete terms.',
    keywords: 'terms of service,terms of use,conditions,legal,intellectual property',
  });
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-xl font-semibold text-weisuan-black">{children}</h2>;
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  if (isZh) {
    return (
      <div>
        <section className="bg-weisuan-black text-white py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>法律</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-5xl">使用条款</h1>
            <p className="mt-4 text-sm text-white-60">生效日期：2025年1月1日 | 最后更新：2026年3月14日</p>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-3 text-sm text-weisuan-gray leading-relaxed">
          <p>欢迎使用微算官方网站（microai.icu，以下简称"本网站"）。本使用条款（以下简称"本条款"）构成您与微算团队（以下简称"我们"）之间关于使用本网站及相关服务的法律协议。访问或使用本网站即表示您同意受本条款的约束。如果您不同意本条款的任何内容，请勿使用本网站。</p>

          <SectionTitle>一、服务说明</SectionTitle>
          <p>本网站为微算团队的官方信息平台，提供以下内容和服务：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>微算产品信息展示（微算-B、微算-P、微算-E系列）</li>
            <li>技术架构和解决方案介绍</li>
            <li>商业合作和合伙人计划信息</li>
            <li>在线咨询和联系功能</li>
            <li>博客和行业洞察内容</li>
            <li>用户反馈收集</li>
          </ul>

          <SectionTitle>二、用户资格</SectionTitle>
          <p>本网站面向企业用户和商业用途。使用本网站，您声明并保证：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>您已年满18岁或达到您所在司法管辖区的法定年龄</li>
            <li>您有权代表您的组织接受本条款（如代表组织使用）</li>
            <li>您不会将本网站用于任何违法目的</li>
          </ul>

          <SectionTitle>三、知识产权</SectionTitle>
          <p>本网站的所有内容，包括但不限于：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>文本、图片、图表、徽标、图标</li>
            <li>产品设计和技术架构图</li>
            <li>软件代码和技术文档</li>
            <li>商标"微算"、"Weisuàn"及相关标识</li>
          </ul>
          <p>均为微算团队或其许可方的知识产权，受中国法律和国际知识产权法律的保护。未经我们事先书面许可，您不得复制、修改、分发、传播、展示、执行、再版、下载、存储或以任何方式使用这些内容用于商业目的。</p>

          <SectionTitle>四、用户行为规范</SectionTitle>
          <p>使用本网站时，您同意不会：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>违反任何适用的法律、法规或规章</li>
            <li>侵犯他人的知识产权或其他合法权益</li>
            <li>上传或传播恶意软件、病毒或其他有害代码</li>
            <li>尝试未经授权访问本网站的任何部分或相关系统</li>
            <li>干扰或破坏本网站的正常运行</li>
            <li>使用自动化手段（如爬虫、机器人）大量抓取网站内容</li>
            <li>冒充他人或提供虚假信息</li>
            <li>进行任何可能损害我们声誉的行为</li>
          </ul>

          <SectionTitle>五、用户账户</SectionTitle>
          <p>如果您在本网站创建账户：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>您有责任维护账户信息的准确性和安全性</li>
            <li>您有责任对使用您账户进行的所有活动负责</li>
            <li>如发现任何未经授权使用您账户的情况，请立即通知我们</li>
            <li>我们保留在合理理由下暂停或终止账户的权利</li>
          </ul>

          <SectionTitle>六、产品信息与定价</SectionTitle>
          <ul className="list-disc pl-5 space-y-1">
            <li>本网站上的产品规格、功能描述和价格仅供参考</li>
            <li>实际产品配置和定价以正式商业合同为准</li>
            <li>我们保留随时修改产品信息和定价的权利</li>
            <li>网站上的降本对比数据基于特定场景测算，实际效果可能因场景不同而有所差异</li>
          </ul>

          <SectionTitle>七、第三方链接</SectionTitle>
          <p>本网站可能包含指向第三方网站或服务的链接。我们不对第三方网站的内容、隐私政策或做法负责。访问第三方链接需自行承担风险。</p>

          <SectionTitle>八、免责声明</SectionTitle>
          <p>本网站及其内容按"现状"和"可用"基础提供，不附带任何明示或暗示的保证，包括但不限于：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>对适销性、特定用途适用性的暗示保证</li>
            <li>对网站不间断、无错误运行的保证</li>
            <li>对信息准确性、完整性或时效性的保证</li>
          </ul>

          <SectionTitle>九、责任限制</SectionTitle>
          <p>在法律允许的最大范围内，微算团队及其管理人员、员工、合作伙伴不对以下情况承担责任：</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>因使用或无法使用本网站而导致的任何直接、间接、附带、特殊或惩罚性损害</li>
            <li>因依赖本网站上的信息而导致的任何损失</li>
            <li>因不可抗力或超出我们合理控制范围的因素导致的服务中断</li>
          </ul>

          <SectionTitle>十、赔偿</SectionTitle>
          <p>您同意赔偿并保护微算团队及其管理人员、员工免受因您违反本条款或违法使用本网站而产生的任何索赔、损失、损害、责任、费用（包括合理的律师费）。</p>

          <SectionTitle>十一、条款变更</SectionTitle>
          <p>我们保留随时修改本条款的权利。修改后的条款将在本页面发布并注明更新日期。您继续使用本网站即表示接受修改后的条款。对于重大变更，我们会在网站上发布显著通知。</p>

          <SectionTitle>十二、终止</SectionTitle>
          <p>我们可以在不事先通知的情况下，因任何原因终止或暂停您对本网站的访问权限。终止后，本条款中依其性质应继续有效的条款将继续有效。</p>

          <SectionTitle>十三、可分割性</SectionTitle>
          <p>如果本条款的任何条款被认定为无效或不可执行，其余条款将继续完全有效。无效条款将被修改为最接近原始意图的有效条款。</p>

          <SectionTitle>十四、适用法律与争议解决</SectionTitle>
          <p>本条款受中华人民共和国法律管辖。因本条款引起的任何争议，双方应首先友好协商解决。协商不成的，任何一方有权向北京市海淀区有管辖权的人民法院提起诉讼。</p>

          <SectionTitle>十五、联系我们</SectionTitle>
          <p>如果您对本使用条款有任何疑问，请联系：</p>
          <div className="mt-4 rounded-2xl bg-weisuan-light p-6">
            <p className="font-medium text-weisuan-black">微算团队</p>
            <p className="mt-1">地址：北京市海淀区</p>
            <p>电子邮件：13426086861@139.com</p>
          </div>

          <div className="mt-12 pt-8 border-t border-black-10">
            <Link href="/privacy" className="text-sm text-weisuan-accent hover:underline">查看隐私政策 →</Link>
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
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-white-60">Effective Date: January 1, 2025 | Last Updated: March 14, 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-3 text-sm text-weisuan-gray leading-relaxed">
        <p>Welcome to the Weisuàn website (microai.icu, the &quot;Website&quot;). These Terms of Service (&quot;Terms&quot;) constitute a legal agreement between you and the Weisuàn Team (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) regarding your access to and use of the Website and related services. By accessing or using the Website, you agree to be bound by these Terms. If you do not agree to any part of these Terms, you must not use the Website.</p>

        <SectionTitle>1. Description of Services</SectionTitle>
        <p>The Website serves as the official information platform for Weisuàn, providing:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Product information for the Weisuàn-B, Weisuàn-P, and Weisuàn-E compute center product lines</li>
          <li>Technical architecture and solution documentation</li>
          <li>Business partnership and franchise program information</li>
          <li>Online inquiry and contact functionality</li>
          <li>Blog articles and industry insights</li>
          <li>User feedback collection</li>
        </ul>

        <SectionTitle>2. Eligibility</SectionTitle>
        <p>The Website is designed for business users and commercial purposes. By using the Website, you represent and warrant that:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>You are at least 18 years of age or have reached the age of majority in your jurisdiction</li>
          <li>You have the authority to enter into these Terms on behalf of your organization (if applicable)</li>
          <li>You will not use the Website for any unlawful purpose</li>
          <li>Your use of the Website will comply with all applicable laws and regulations</li>
        </ul>

        <SectionTitle>3. Intellectual Property Rights</SectionTitle>
        <p>All content on the Website, including but not limited to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Text, images, graphics, logos, icons, and visual designs</li>
          <li>Product designs and technical architecture diagrams</li>
          <li>Software code and technical documentation</li>
          <li>The trademarks &quot;微算,&quot; &quot;Weisuàn,&quot; and associated logos and brand identifiers</li>
        </ul>
        <p>are the intellectual property of the Weisuàn Team or its licensors, protected by the laws of the People&apos;s Republic of China and international intellectual property laws. You may not copy, modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any content from the Website for commercial purposes without our prior written consent.</p>
        <p><strong>Limited License:</strong> We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Website for personal, non-commercial informational purposes only.</p>

        <SectionTitle>4. User Conduct</SectionTitle>
        <p>When using the Website, you agree not to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Violate any applicable local, state, national, or international laws or regulations</li>
          <li>Infringe upon the intellectual property rights or other legal rights of any third party</li>
          <li>Upload or transmit malicious software, viruses, or other harmful code</li>
          <li>Attempt to gain unauthorized access to any portion of the Website or its related systems</li>
          <li>Interfere with or disrupt the normal operation of the Website</li>
          <li>Use automated means (such as crawlers, bots, or scrapers) to access or collect content from the Website without authorization</li>
          <li>Impersonate any person or entity, or provide false or misleading information</li>
          <li>Engage in any activity that could damage our reputation or business interests</li>
          <li>Attempt to reverse-engineer, decompile, or disassemble any software on the Website</li>
        </ul>

        <SectionTitle>5. User Accounts</SectionTitle>
        <p>If you create an account on the Website:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>You are responsible for maintaining the accuracy and security of your account information</li>
          <li>You are responsible for all activities conducted through your account</li>
          <li>You must promptly notify us of any unauthorized use of your account</li>
          <li>We reserve the right to suspend or terminate accounts at our discretion for violation of these Terms</li>
        </ul>

        <SectionTitle>6. Product Information and Pricing</SectionTitle>
        <ul className="list-disc pl-5 space-y-1">
          <li>Product specifications, features, and prices displayed on the Website are for informational purposes only</li>
          <li>Actual product configurations and pricing are subject to formal commercial agreements</li>
          <li>We reserve the right to modify product information and pricing at any time without notice</li>
          <li>Cost comparison data presented on the Website is based on specific scenario calculations; actual results may vary depending on deployment conditions</li>
          <li>Nothing on the Website constitutes a binding offer to sell products or services</li>
        </ul>

        <SectionTitle>7. Third-Party Links</SectionTitle>
        <p>The Website may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of third-party websites. Accessing third-party links is at your own risk. We do not endorse or make any representations about third-party websites.</p>

        <SectionTitle>8. Disclaimer of Warranties</SectionTitle>
        <p>THE WEBSITE AND ITS CONTENT ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT</li>
          <li>WARRANTIES THAT THE WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE</li>
          <li>WARRANTIES REGARDING THE ACCURACY, COMPLETENESS, OR TIMELINESS OF ANY INFORMATION</li>
        </ul>

        <SectionTitle>9. Limitation of Liability</SectionTitle>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE WEISUÀN TEAM AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND PARTNERS SHALL NOT BE LIABLE FOR:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the Website</li>
          <li>Any loss resulting from reliance on information presented on the Website</li>
          <li>Any service interruptions caused by force majeure or circumstances beyond our reasonable control</li>
          <li>Any damages arising from unauthorized access to or alteration of your data</li>
        </ul>
        <p>In jurisdictions that do not allow the exclusion of certain warranties or limitation of liability for certain damages, our liability shall be limited to the maximum extent permitted by law.</p>

        <SectionTitle>10. Indemnification</SectionTitle>
        <p>You agree to indemnify, defend, and hold harmless the Weisuàn Team and its officers, directors, employees, and agents from and against any and all claims, losses, damages, liabilities, costs, and expenses (including reasonable attorneys&apos; fees) arising from your violation of these Terms, your use of the Website, or your violation of any law or the rights of any third party.</p>

        <SectionTitle>11. Modifications to Terms</SectionTitle>
        <p>We reserve the right to modify these Terms at any time. Updated Terms will be posted on this page with a revised &quot;Last Updated&quot; date. Your continued use of the Website after any modifications constitutes acceptance of the updated Terms. For material changes, we will provide prominent notice on the Website. We encourage you to review these Terms periodically.</p>

        <SectionTitle>12. Termination</SectionTitle>
        <p>We may terminate or suspend your access to the Website at any time, without prior notice, for any reason, including without limitation if we believe you have violated these Terms. Upon termination, all provisions of these Terms that by their nature should survive will remain in full force and effect, including ownership provisions, warranty disclaimers, and limitations of liability.</p>

        <SectionTitle>13. Severability</SectionTitle>
        <p>If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the original intent.</p>

        <SectionTitle>14. Entire Agreement</SectionTitle>
        <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and the Weisuàn Team regarding your use of the Website, and supersede all prior agreements, understandings, and communications, whether written or oral.</p>

        <SectionTitle>15. Governing Law and Dispute Resolution</SectionTitle>
        <p>These Terms shall be governed by and construed in accordance with the laws of the People&apos;s Republic of China. Any dispute arising from these Terms shall first be resolved through good-faith negotiation. If negotiation fails, either party may submit the dispute to the competent People&apos;s Court in Haidian District, Beijing, China.</p>
        <p>For users outside of China, to the extent permitted by applicable law, these Terms shall be governed by the laws of the jurisdiction in which the Weisuàn Team is primarily located, without regard to its conflict of law provisions.</p>

        <SectionTitle>16. Contact Us</SectionTitle>
        <p>If you have any questions about these Terms of Service, please contact us:</p>
        <div className="mt-4 rounded-2xl bg-weisuan-light p-6">
          <p className="font-medium text-weisuan-black">Weisuàn Team</p>
          <p className="mt-1">Address: Haidian District, Beijing, China</p>
          <p>Email: 13426086861@139.com</p>
        </div>

        <div className="mt-12 pt-8 border-t border-black-10">
          <Link href="/privacy" className="text-sm text-weisuan-accent hover:underline">View Privacy Policy →</Link>
        </div>
      </article>
    </div>
  );
}
