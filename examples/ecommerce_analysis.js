// 电商数据分析示例
const SimpleMarketAnalyzer = require('../simple_analyzer.js');
const fs = require('fs');

console.log('=== 电商数据分析示例 ===\n');

class EcommerceAnalyzer extends SimpleMarketAnalyzer {
    constructor() {
        super();
        this.platforms = ['taobao', 'pinduoduo', 'jd'];
    }
    
    // 模拟多平台数据
    generateMultiPlatformData(days = 30) {
        const platformsData = {};
        
        this.platforms.forEach(platform => {
            // 为每个平台生成不同的数据特征
            const baseSales = platform === 'taobao' ? 1200 : 
                            platform === 'jd' ? 800 : 600;
            
            const data = [];
            const now = new Date();
            
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i);
                
                // 平台特定的增长模式
                let trend;
                if (platform === 'taobao') {
                    trend = (i / days) * 0.4; // 淘宝增长较快
                } else if (platform === 'jd') {
                    trend = (i / days) * 0.25; // 京东平稳增长
                } else {
                    trend = (i / days) * 0.15; // 拼多多缓慢增长
                }
                
                const noise = (Math.random() - 0.5) * 0.3;
                const sales = Math.round(baseSales * (1 + trend + noise));
                const visitors = Math.round(sales * (6 + Math.random() * 6));
                const conversionRate = ((sales / visitors) * 100).toFixed(2);
                
                data.push({
                    date: date.toISOString().split('T')[0],
                    platform,
                    sales,
                    visitors,
                    conversionRate: parseFloat(conversionRate),
                    avgOrderValue: Math.round(sales * 0.8 + Math.random() * 100) // 模拟客单价
                });
            }
            
            platformsData[platform] = data;
        });
        
        return platformsData;
    }
    
    // 分析平台表现
    analyzePlatformPerformance(platformsData) {
        const analysis = {};
        
        Object.entries(platformsData).forEach(([platform, data]) => {
            const sales = data.map(d => d.sales);
            const totalSales = sales.reduce((a, b) => a + b, 0);
            const avgSales = Math.round(totalSales / sales.length);
            const growth = ((sales[sales.length-1] / sales[0] - 1) * 100).toFixed(1);
            
            const conversionRates = data.map(d => d.conversionRate);
            const avgConversion = (conversionRates.reduce((a, b) => a + b, 0) / conversionRates.length).toFixed(2);
            
            const orderValues = data.map(d => d.avgOrderValue);
            const avgOrderValue = Math.round(orderValues.reduce((a, b) => a + b, 0) / orderValues.length);
            
            analysis[platform] = {
                totalSales,
                avgDailySales: avgSales,
                salesGrowth: `${growth}%`,
                avgConversionRate: `${avgConversion}%`,
                avgOrderValue: `¥${avgOrderValue}`,
                bestDay: data.reduce((best, day) => day.sales > best.sales ? day : data[0]).date,
                worstDay: data.reduce((worst, day) => day.sales < worst.sales ? day : data[0]).date
            };
        });
        
        return analysis;
    }
    
    // 生成电商分析报告
    generateEcommerceReport(analysis, filename = 'ecommerce_report.md') {
        let report = '# 电商多平台分析报告\n\n';
        report += `生成时间: ${new Date().toISOString().replace('T', ' ').substring(0, 19)}\n\n`;
        
        report += '## 平台表现对比\n\n';
        report += '| 平台 | 总销售额 | 日均销售额 | 增长率 | 平均转化率 | 平均客单价 | 最佳日 |\n';
        report += '|------|----------|------------|--------|------------|------------|--------|\n';
        
        Object.entries(analysis).forEach(([platform, stats]) => {
            report += `| ${platform} | ¥${stats.totalSales.toLocaleString()} | ¥${stats.avgDailySales.toLocaleString()} | ${stats.salesGrowth} | ${stats.avgConversionRate} | ${stats.avgOrderValue} | ${stats.bestDay} |\n`;
        });
        
        // 找出表现最佳的平台
        const bestPlatform = Object.entries(analysis).reduce((best, [platform, stats]) => {
            return stats.totalSales > best.stats.totalSales ? { platform, stats } : best;
        }, { platform: '', stats: { totalSales: 0 } });
        
        report += '\n## 关键洞察\n\n';
        report += `1. **最佳表现平台**: ${bestPlatform.platform}，总销售额 ¥${bestPlatform.stats.totalSales.toLocaleString()}\n`;
        
        // 计算平台间差异
        const platforms = Object.keys(analysis);
        if (platforms.length >= 2) {
            const salesDiff = analysis[platforms[0]].totalSales - analysis[platforms[1]].totalSales;
            const diffPercent = ((salesDiff / analysis[platforms[1]].totalSales) * 100).toFixed(1);
            report += `2. **平台差异**: ${platforms[0]} 比 ${platforms[1]} ${salesDiff > 0 ? '高' : '低'} ${Math.abs(diffPercent)}%\n`;
        }
        
        // 增长建议
        report += '\n## 优化建议\n\n';
        report += '1. **资源倾斜**: 加大对最佳表现平台的投入\n';
        report += '2. **转化优化**: 分析低转化率平台的原因，针对性优化\n';
        report += '3. **客单价提升**: 通过交叉销售、捆绑销售提升客单价\n';
        report += '4. **趋势跟踪**: 持续监控各平台增长趋势，及时调整策略\n';
        
        report += '\n---\n';
        report += '*报告由 Market Analyzer 生成*\n';
        report += '*工具地址: https://github.com/wangdunhao5-ux/market-analyze*\n';
        report += '*技术支持微信: ss66s66e*\n';
        
        fs.writeFileSync(filename, report, 'utf8');
        console.log(`电商分析报告已生成: ${filename}`);
        return report;
    }
}

// 使用示例
console.log('1. 生成多平台电商数据...');
const ecommerceAnalyzer = new EcommerceAnalyzer();
const platformsData = ecommerceAnalyzer.generateMultiPlatformData(30);

console.log(`   生成 ${Object.keys(platformsData).length} 个平台数据:`);
Object.keys(platformsData).forEach(platform => {
    console.log(`   - ${platform}: ${platformsData[platform].length} 天数据`);
});

console.log('\n2. 分析平台表现...');
const platformAnalysis = ecommerceAnalyzer.analyzePlatformPerformance(platformsData);

Object.entries(platformAnalysis).forEach(([platform, stats]) => {
    console.log(`\n   ${platform.toUpperCase()} 平台:`);
    console.log(`   总销售额: ¥${stats.totalSales.toLocaleString()}`);
    console.log(`   日均销售额: ¥${stats.avgDailySales.toLocaleString()}`);
    console.log(`   增长率: ${stats.salesGrowth}`);
    console.log(`   平均转化率: ${stats.avgConversionRate}`);
    console.log(`   平均客单价: ${stats.avgOrderValue}`);
});

console.log('\n3. 生成电商分析报告...');
ecommerceAnalyzer.generateEcommerceReport(platformAnalysis);

console.log('\n=== 示例完成 ===');
console.log('\n实际应用建议:');
console.log('1. 替换模拟数据为真实平台API数据');
console.log('2. 添加更多分析维度（流量来源、用户行为等）');
console.log('3. 设置自动化定时任务，每日生成报告');
console.log('4. 集成到企业微信/钉钉，自动推送报告');