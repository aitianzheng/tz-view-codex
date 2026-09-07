# 网站点击事件接入状态

2026-09-07：已添加前端事件，但检查到的线上 HTML 未包含 Cloudflare Web Analytics beacon 或 Zaraz 加载脚本。不能据此前端代码宣称后台已开始计数。没有自动新建统计账号、启用付费服务或发送数据给新的第三方。

## 接入约定

页面只在已有 `window.zaraz.track` 可用时调用，未配置、拦截或出错时不影响导航。尊重 DNT 和 Global Privacy Control。不存储访客标识，不向 track 传入邮箱、微信号、订单号、账号信息、完整 URL 或查询参数。Zaraz 自身及下游工具的数据收集仍需在 Cloudflare 后台单独审查。

| 事件 | destination | placement |
| --- | --- | --- |
| service_click | tz_mall / tz_shop | hero / projects / footer |
| contact_click | wechat / email / telegram / contact | hero / nav / guide / contact / footer |
| contact_copy | email | contact |
| wechat_qr_download | wechat | contact |
| content_click | x / us_stocks / hk_banking | hero / writing / contact / footer |

`contact_copy` 只在剪贴板复制成功后调用。二维码事件表示用户点击了下载链接，不代表已保存成功或已添加微信。微信入口点击也不代表添加好友。统计调用不等待、不拦截链接导航；浏览器拦截、网络断开或立即离开页面可能导致事件丢失。函数返回 true 仅表示 Zaraz 调用完成，不是后台入库证明。

## 仍需配置与验证

在 tz-view.com 对应的 Cloudflare Zaraz 中，确认已启用加载，并选择用户认可的统计目的地。按上表 Event Name 建立触发器和动作，将 `{{ client.destination }}` 与 `{{ client.placement }}` 映射到报表字段。没有目的地、触发器及动作配置，前端事件不等于可查询统计。

上线后用 Zaraz 调试与最终统计报表验证两个商城入口、微信入口、二维码下载、邮箱复制，确认每次操作只产生一个对应事件；不要将测试请求计入业务转化结论。

官方说明：https://developers.cloudflare.com/zaraz/web-api/track/

本地测试：`node --experimental-strip-types --test scripts/analytics.test.mjs`

## 真实资料待补充

- 微信号尚未提供，显示名称“天正”不能当作微信号。当前提供二维码下载及邮箱复制，不显示虚假的“复制微信号”。
- 已加入用户提供的美股投资体系与港卡两篇 X 贴文链接，分别使用 us_stocks / hk_banking 事件标签；不附加未经核实的阅读量、收益或文章摘要。项目截图尚未提供。
- 不承诺未经确认的响应时间、交付时效、退款或售后条款；具体方案以对应服务站说明为准。
