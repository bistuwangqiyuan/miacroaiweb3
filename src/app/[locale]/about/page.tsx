import { setRequestLocale } from 'next-intl/server';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isZh = locale === 'zh';

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-weisuan-black">
        {isZh ? '关于我们' : 'About'}
      </h1>
      <p className="mt-4 text-weisuan-gray">
        {isZh ? '微算团队是国内目前已知的唯一一家通过硬件加速全闪存储实现算力加速的团队。' : 'Weisuàn is the only known team in China achieving compute acceleration via hardware-accelerated all-flash storage.'}
      </p>
      <div className="mt-10 overflow-x-auto">
        <table className="w-full max-w-2xl border-collapse text-left text-sm">
          <tbody>
            <tr className="border-b border-black-10"><td className="py-3 pr-8 font-medium text-weisuan-gray">{isZh ? '项目名称' : 'Project'}</td><td className="py-3">微算——数据不出域的可扩展微型算力中心</td></tr>
            <tr className="border-b border-black-10"><td className="py-3 pr-8 font-medium text-weisuan-gray">{isZh ? '编制单位' : 'Team'}</td><td className="py-3">微算团队</td></tr>
            <tr className="border-b border-black-10"><td className="py-3 pr-8 font-medium text-weisuan-gray">{isZh ? '编制日期' : 'Date'}</td><td className="py-3">2026年3月</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
