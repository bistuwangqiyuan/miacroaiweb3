# 销售部 - 允许的工具
- files: 读写 /orders/sales/、/reports/sales/、/data/crm/、/knowledge/、/data/content/email-drafts/
- shell: 调用 SendGrid API 发送邮件、调用企业微信API发通知、调用官网API拉取线索
- email: 通过 IMAP 读取邮箱来信，检查客户回复
- browser: 无（Sales不需要上网，Scout负责搜索）
