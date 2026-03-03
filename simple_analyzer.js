// 简单市场分析工具 - Node.js版本
// 无需外部依赖

const fs = require('fs');
const path = require('path');

class SimpleMarketAnalyzer {
    constructor() {
        this.data = null;
    }

    generateSampleData(days = 30) {
        const data = [];
        const now = new Date();
        
        let baseSales = 1000;
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            // 模拟增长趋势和随机波动
            const trend = (i / days) * 0.3;
            const noise = (Math.random() - 0.5) * 0.2;
            const sales = Math.round(baseSales * (1 + trend + noise));
            const visitors = Math.round(sales * (8 + Math.random() * 4));
            const conversionRate = ((sales / visitors) * 100).toFixed(2);
            
            data.push({
                date: date.toISOString().split('T')[0],
                sales,
                visitors,
                conversionRate: parseFloat(conversionRate)
            });
        }
        
        this.data = data;
        return data;
    }

    analyzeTrends() {
        if (!this.data) {
            this.generateSampleData();
        }

        const sales = this.data.map(d => d.sales);
        const totalSales = sales.reduce((a, b) => a + b, 0);
        const avgSales = Math.round(totalSales / sales.length);
        const growth = ((sales[sales.length - 1] / sales[0] - 1) * 100).toFixed(1);
        
        const conversionRates = this.data.map(d => d.conversionRate);
        const avgConversion = (conversionRates.reduce((a, b) => a + b, 0) / conversionRates.length).toFixed(2);
        
        let bestDay = this.data[0];
        let worstDay = this.data[0];
        
        this.data.forEach(day => {
            if (day.sales > bestDay.sales) bestDay = day;
            if (day.sales < worstDay.sales) worstDay = day;
        });

        return {
            totalSales,
            avgDailySales: avgSales,
            salesGrowth: `${growth}%`,
            avgConversionRate: `${avgConversion}%`,
            bestDay: bestDay.date,
            worstDay: worstDay.date,
            dataPoints: this.data.length
        };
    }

    generateReport(outputFile = 'simple_market_report.md') {
        const analysis = this.analyzeTrends();
        const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
        
        const report = `# 简易市场数据分析报告
生成时间: ${now}
分析周期: ${this.data[0].date} 至 ${this.data[this.data.length - 1].date}

## 关键指标
- **总销售额**: ¥${analysis.totalSales.toLocaleString()}
- **日均销售额**: ¥${analysis.avgDailySales.toLocaleString()}
- **销售增长率**: ${analysis.salesGrowth}
- **平均转化率**: ${analysis.avgConversionRate}
- **最佳销售日**: ${analysis.bestDay}
- **最差销售日**: ${analysis.worstDay}
- **分析数据点**: ${analysis.dataPoints}天

## 趋势分析
1. 销售呈现${analysis.salesGrowth}的增长率
2. 转化率稳定在${analysis.avgConversionRate}左右
3. 建议对比最佳日(${analysis.bestDay})和最差日(${analysis.worstDay})的运营策略

##  actionable建议
1. **复制成功**: 分析最佳日的营销活动和用户行为
2. **优化弱点**: 调查最差日的问题根源
3. **自动化监控**: 建立关键指标每日监控
4. **A/B测试**: 对低转化环节进行优化测试

---
*报告由简易市场分析工具生成*
*工具特点: 零依赖、快速部署、数据可视化准备*`;

        fs.writeFileSync(outputFile, report, 'utf8');
        console.log(`报告已生成: ${outputFile}`);
        return report;
    }

    generateCSV(outputFile = 'market_data.csv') {
        if (!this.data) {
            this.generateSampleData();
        }

        const headers = ['日期', '销售额', '访问量', '转化率%'];
        const rows = this.data.map(d => [
            d.date,
            d.sales,
            d.visitors,
            d.conversionRate
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        fs.writeFileSync(outputFile, csvContent, 'utf8');
        console.log(`CSV数据已导出: ${outputFile}`);
    }
}

// 使用示例
if (require.main === module) {
    const analyzer = new SimpleMarketAnalyzer();
    
    console.log('=== 简易市场分析工具 ===');
    console.log('生成模拟数据中...');
    
    const data = analyzer.generateSampleData();
    console.log('\n数据预览 (前5天):');
    console.table(data.slice(0, 5));
    
    console.log('\n分析结果:');
    const analysis = analyzer.analyzeTrends();
    Object.entries(analysis).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    
    analyzer.generateReport();
    analyzer.generateCSV();
    
    console.log('\n工具准备就绪，可用于:');
    console.log('1. 客户市场数据分析');
    console.log('2. 销售趋势报告生成');
    console.log('3. 业务决策支持');
}

module.exports = SimpleMarketAnalyzer;