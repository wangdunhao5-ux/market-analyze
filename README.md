# Market Analyzer - 轻量级市场分析工具

![Node.js](https://img.shields.io/badge/Node.js-≥12.0.0-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-0-brightgreen)

一个零依赖、快速部署的市场数据分析工具，专为中小企业和创业者设计。无需复杂配置，5分钟即可开始生成专业数据分析报告。

## ✨ 特性

- **零依赖**：纯Node.js实现，无需安装额外库
- **快速上手**：5分钟部署，立即生成报告
- **多格式输出**：Markdown报告 + CSV数据文件
- **模拟数据**：内置数据生成器，无需真实数据即可测试
- **可扩展**：模块化设计，轻松添加自定义分析逻辑
- **完全本地**：数据不出本地，保障隐私安全

## 🚀 快速开始

### 安装
```bash
git clone https://github.com/AlickLin/market-analyzer.git
cd market-analyzer
```

### 运行示例
```bash
npm start
# 或直接运行
node simple_analyzer.js
```

### 查看结果
工具将生成：
1. `simple_market_report.md` - 完整分析报告
2. `market_data.csv` - 模拟数据文件

## 📊 功能演示

### 数据预览
```javascript
const Analyzer = require('./simple_analyzer.js');
const analyzer = new Analyzer();

// 生成30天模拟数据
const data = analyzer.generateSampleData(30);
console.log('前5天数据:');
console.table(data.slice(0, 5));
```

### 趋势分析
```javascript
const analysis = analyzer.analyzeTrends();
console.log('关键指标:');
console.log(`总销售额: ¥${analysis.totalSales.toLocaleString()}`);
console.log(`日均销售额: ¥${analysis.avgDailySales.toLocaleString()}`);
console.log(`销售增长率: ${analysis.salesGrowth}`);
console.log(`平均转化率: ${analysis.avgConversionRate}`);
```

### 报告生成
```javascript
// 生成Markdown格式报告
analyzer.generateReport('my_report.md');

// 导出CSV数据
analyzer.generateCSV('my_data.csv');
```

## 🛠️ 使用场景

### 1. 每日销售监控
```bash
# 添加到cron任务，每日自动运行
0 9 * * * cd /path/to/market-analyzer && node simple_analyzer.js
```

### 2. 多店铺对比
```javascript
const shops = ['taobao', 'pinduoduo', 'jd'];
shops.forEach(shop => {
    const analyzer = new Analyzer();
    analyzer.loadData(`data/${shop}.csv`);
    analyzer.generateReport(`reports/${shop}_report.md`);
});
```

### 3. 预警系统
```javascript
const analysis = analyzer.analyzeTrends();
if (parseFloat(analysis.salesGrowth) < -10) {
    // 发送预警通知
    sendAlert('销售大幅下滑！需立即检查');
}
```

## 📈 输出示例

### 分析报告片段
```
# 市场数据分析报告
生成时间: 2026-03-03 12:30:00

## 关键指标
- **总销售额**: ¥34,715
- **日均销售额**: ¥1,157  
- **销售增长率**: -26.6%
- **平均转化率**: 9.78%
- **最佳销售日**: 2026-02-02
- **最差销售日**: 2026-03-02

## 趋势分析
1. 销售呈现-26.6%的增长率，需关注下滑原因
2. 转化率稳定在9.78%左右，有优化空间
3. 建议对比最佳日和最差日的运营策略差异
```

## 🔧 自定义扩展

### 添加新的分析维度
```javascript
class CustomAnalyzer extends SimpleMarketAnalyzer {
    analyzeCustomerLifetime() {
        // 实现客户生命周期价值分析
        return {
            avgLifetime: this.calculateAvgLifetime(),
            retentionRate: this.calculateRetentionRate()
        };
    }
}
```

### 集成数据源
```javascript
// 从API获取真实数据
async function loadRealData(apiUrl) {
    const response = await fetch(apiUrl);
    const realData = await response.json();
    analyzer.loadRealData(realData);
}
```

## 📁 项目结构
```
market-analyzer/
├── simple_analyzer.js     # 核心分析工具
├── package.json          # 项目配置
├── README.md            # 项目文档
├── LICENSE              # MIT许可证
├── service_offer.md     # 商业服务介绍
├── tech_tutorial.md     # 技术教程
└── .gitignore          # Git忽略文件
```

## 💼 商业服务

除了开源工具，我们还提供：

### 定制开发服务
- **企业级数据分析系统**
- **自动化报告流水线**
- **数据可视化仪表板**
- **系统集成与API开发**

### 咨询与培训
- **数据分析方法指导**
- **团队技术培训**
- **数据驱动决策咨询**

**了解更多**: [service_offer.md](service_offer.md)

## 🤝 贡献

欢迎提交Issue和Pull Request！

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者

**林凯 (Alick Lin)** - 数据分析师 & 工具开发者

- GitHub: [@AlickLin](https://github.com/AlickLin)
- 邮箱: alick.lin@protonmail.com
- 微信: ss66s66e

## 🙏 致谢

感谢所有使用和贡献本项目的用户！

---

**如果这个项目对你有帮助，请给个⭐️支持！**