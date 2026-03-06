import { setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/ContactForm';
import { queryLatestFeedback } from '@/lib/db';
import Image from 'next/image';

type FeedbackItem = { id: number; content: string; locale: string; created_at: string };

export const dynamic = 'force-dynamic';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  const latestFeedback = (await queryLatestFeedback(3)) as FeedbackItem[];

  return (
    <div>
      <section className="bg-weisuan-black text-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
            {isZh ? '联系我们' : 'Contact Us'}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tighter sm:text-6xl">
            {isZh ? '期待与您合作' : 'Let\'s Work Together'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white-60 leading-relaxed">
            {isZh
              ? '无论是产品咨询、合伙人加盟、合作洽谈还是技术交流，欢迎随时联系。零加盟费即可成为共享微算事业合伙人，免费获得100套微算设备。'
              : 'Whether for product inquiries, partnership, or technical exchange — reach out anytime. Become a partner with zero franchise fee and receive 100 free Weisuàn units.'}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '发送留言' : 'Send a Message'}</h2>
              <p className="mt-2 text-sm text-weisuan-gray">{isZh ? '填写以下表单，我们将在24小时内回复。' : 'Fill out the form below and we\'ll reply within 24 hours.'}</p>
              <div className="mt-8">
                <ContactForm locale={locale} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '联系方式' : 'Contact Info'}</h2>
              <div className="mt-8 space-y-6">
                {[
                  { iconZh: '📧', labelZh: '邮箱', labelEn: 'Email', value: '13426086861@139.com' },
                  { iconZh: '📍', labelZh: '地址', labelEn: 'Address', value: isZh ? '北京市海淀区' : 'Haidian District, Beijing, China' },
                  { iconZh: '🕐', labelZh: '工作时间', labelEn: 'Working Hours', value: isZh ? '周一至周五 9:00-18:00' : 'Mon-Fri 9:00-18:00 (CST)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-weisuan-light">
                    <span className="text-xl">{item.iconZh}</span>
                    <div>
                      <p className="text-sm font-medium text-weisuan-black">{isZh ? item.labelZh : item.labelEn}</p>
                      <p className="mt-1 text-sm text-weisuan-gray">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold text-weisuan-black">{isZh ? '微信联系' : 'WeChat Contact'}</h3>
                <p className="mt-2 text-sm text-weisuan-gray">{isZh ? '扫描二维码添加微信，获取更多信息' : 'Scan the QR code to connect via WeChat'}</p>
                <div className="mt-4 inline-block rounded-2xl bg-white p-4 shadow-sm border border-black-10">
                  <Image
                    src="/image/微信联系二维码.png"
                    alt={isZh ? '微信联系二维码' : 'WeChat QR Code'}
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-semibold text-weisuan-black">{isZh ? '合伙人咨询' : 'Partner Inquiry'}</h3>
                <div className="mt-4 p-6 rounded-2xl bg-weisuan-light border border-black-10">
                  <p className="text-sm text-weisuan-gray leading-relaxed">
                    {isZh
                      ? '共享微算事业合伙人招募中！零加盟费，免费获得100套微算设备（价值约500万元），获得股权/期权激励，共享上市收益。无需AI技术背景，微算团队提供全套技术支持与培训。'
                      : 'Shared Weisuàn partner recruitment! Zero franchise fee, receive 100 free Weisuàn units (worth ~¥5M), equity/option incentives, and IPO proceeds sharing. No AI background required — full technical support provided.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {latestFeedback.length > 0 && (
        <section className="bg-weisuan-light py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-weisuan-black">{isZh ? '最新用户反馈' : 'Latest User Feedback'}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {latestFeedback.map((item) => (
                <div key={item.id} className="card-hover rounded-2xl bg-white p-6">
                  <p className="text-sm text-weisuan-black leading-relaxed">{item.content}</p>
                  <p className="mt-4 text-xs text-weisuan-gray">
                    {new Date(item.created_at).toLocaleDateString(item.locale === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
